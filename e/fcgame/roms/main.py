import os
import json
from pypinyin import lazy_pinyin

def read_and_rename_files_in_directory(directory):
    # 获取目录下的所有文件
    files = os.listdir(directory)
    # 创建一个列表来存储文件信息
    file_list = []

    for file_name in files:
        # 确保是文件
        if os.path.isfile(os.path.join(directory, file_name)):
            # 去掉后缀名
            base_name, ext = os.path.splitext(file_name)
            # 将中文文件名转换为拼音
            if any(ord(char) > 127 for char in base_name):
                base_name_pinyin = ''.join(lazy_pinyin(base_name))
                new_file_name = f'{base_name_pinyin}{ext}'
                # 重命名文件
                os.rename(os.path.join(directory, file_name), os.path.join(directory, new_file_name))
                file_list.append([base_name, f'roms/noise/{new_file_name}'])
            else:
                file_list.append([base_name, f'roms/noise/{file_name}'])

    return file_list

def write_to_js_file(file_list, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        # 将列表包装在一个字典中
        file_dict = {
            "FC精选": file_list
        }
        # 将字典转换为JSON格式的字符串
        json_str = json.dumps(file_dict, indent=4, ensure_ascii=False)
        # 写入JavaScript变量声明
        f.write("const fileData = " + json_str + ";\n")

def main():
    directory = 'noise'
    output_file = 'output.js'
    
    # 读取文件信息并重命名文件
    file_list = read_and_rename_files_in_directory(directory)
    
    # 写入JavaScript文件
    write_to_js_file(file_list, output_file)
    print(f"文件已成功输出到 {output_file}")

if __name__ == '__main__':
    main()
