#!/usr/bin/env python3
import json
import requests
import pandas as pd
import os

urls = [
    'https://en.wikipedia.org/wiki/List_of_current_members_of_the_United_States_House_of_Representatives',
    'https://en.wikipedia.org/wiki/List_of_US_Senators'
]


def rm_if_exists(file):
    if os.path.exists(file):
        os.remove(file)


def scrape_data(url, field, file):
    html = requests.get(url).content
    df_list = pd.read_html(html)
    df = df_list[field]
    df.to_json(file)


def grab_json(jsonFile):
    with open(jsonFile, 'r') as json_file:
        data = json.load(json_file)
    return data


def grab_data(new_reps_data, field):
    data = {}
    for key, value in new_reps_data[field].items():
        data[key] = value
    return data


# TODO: break this out into smaller funcs
def update_reps():
    rm_if_exists('new_reps.json')
    rm_if_exists('new_sens.json')
    scrape_data(urls[0], 6, 'new_reps.json')
    scrape_data(urls[1], 5, 'new_sens.json')

    # Load the my_data.json file containing the new representatives
    new_reps_data = grab_json('new_reps.json')
    new_sens_data = grab_json('new_sens.json')
    states_data = grab_json('states.json')

    # Grab representatives' data
    new_reps = grab_data(new_reps_data, 'Member')
    districts = grab_data(new_reps_data, 'District')

    # Grab new senators' data
    new_sens = grab_data(new_sens_data, 'Senator')
    states = grab_data(new_sens_data, 'State')

    new_sen_info = {}
    for key, state in states.items():
        new_sen_info[key] = {'state_name': state, 'senator': new_sens[key]}

    sen_result_dict = {}
    for key, value in new_sen_info.items():
        state_name = value['state_name']
        sen = value['senator']

        if state_name not in sen_result_dict:
            sen_result_dict[state_name] = {
                'state_name': state_name,
                'senators': []
            }

        sen_result_dict[state_name]['senators'].append(sen)

    sen_result_list = list(sen_result_dict.values())

    # Remove unnecessary escape codes from district names
    districts = {
        key: value.split('\u00a0')[0]
        for key, value in districts.items()
    }

    new_state_info = {}
    for key, district in districts.items():
        new_state_info[key] = {
            'state_name': district,
            'representative': new_reps[key]
        }

    result_dict = {}
    for key, value in new_state_info.items():
        state_name = value['state_name']
        rep = value['representative']

        if state_name not in result_dict:
            result_dict[state_name] = {
                'state_name': state_name,
                'house_delegation': []
            }

        result_dict[state_name]['house_delegation'].append(rep)

    result_list = list(result_dict.values())

    # Update the states.json data with the new representatives
    for state in states_data:
        state_name = state['state_name']
        for result in result_list:
            if result['state_name'] == state_name:
                state['house_delegation'] = result['house_delegation']
        for sen_result in sen_result_list:
            if sen_result['state_name'] == state_name:
                state['senators'] = sen_result['senators']

    # Save the updated states data back to states.json
        with open('states.json', 'w') as json_file:
            json.dump(states_data, json_file, indent=2)


if __name__ == "__main__":
    update_reps()
    os.remove('new_reps.json')
    os.remove('new_sens.json')
