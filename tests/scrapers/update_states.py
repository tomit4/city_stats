#!/usr/bin/env python3
import json
import requests
import pandas as pd
import os


def scrape_rep_data():
    url = 'https://en.wikipedia.org/wiki/List_of_current_members_of_the_United_States_House_of_Representatives'
    html = requests.get(url).content
    df_list = pd.read_html(html)
    df = df_list[6]
    df.to_json('new_reps.json')


def scrape_sen_data():
    url = 'https://en.wikipedia.org/wiki/List_of_US_Senators'
    html = requests.get(url).content
    df_list = pd.read_html(html)
    df = df_list[5]
    df.to_json('new_sens.json')


# TODO: break this out into smaller funcs
def update_reps():
    if os.path.exists('new_reps.json'):
        os.remove('new_reps.json')
    if os.path.exists('new_sens.json'):
        os.remove('new_sens.json')
    scrape_rep_data()
    scrape_sen_data()

    # Load the my_data.json file containing the new representatives
    with open('new_reps.json', 'r') as json_file:
        new_reps_data = json.load(json_file)
    with open('new_sens.json', 'r') as json_file:
        new_sens_data = json.load(json_file)
    # Load the states.json file containing the state information
    with open('states.json', 'r') as json_file:
        states_data = json.load(json_file)

    # Create a dictionary to store the new representatives' data
    new_reps = {}
    districts = {}
    for key, rep in new_reps_data['Member'].items():
        new_reps[key] = rep
    for key, state_name in new_reps_data['District'].items():
        districts[key] = state_name

    # Create a dictionary to store the new senators' data
    new_sens = {}
    states = {}
    for key, sen in new_sens_data['Senator'].items():
        new_sens[key] = sen
    for key, state_name in new_sens_data['State'].items():
        states[key] = state_name

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
