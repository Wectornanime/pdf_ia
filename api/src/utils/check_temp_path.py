import os

def check_temp_path():
    if not os.path.exists('temp/'):
        os.makedirs('temp/')
        print('temp path created')
