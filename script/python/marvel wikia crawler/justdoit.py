#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Jan 16 17:26:48 2015

@author: stevo
"""

import urllib3
import io
import os
import sys
import json

class Downloader():
    '''
     download a file and print the status if desired
    '''

    _block_sz = 2^13; # == 8192;
    _http = urllib3.PoolManager()

    def get(self, url, printstatus=False):
        # check if file exists
        try:
            r = self._http.request('GET', url, preload_content=False)
        except Exception as e:
            print('Error while retrieving URL:\'{}\' \nMessage:\'{}\''.format(url, e));
            return None, None;
        if r.status != 200:
            print('File does not exist! URL:\'{}\' \nRESPONSE: \'{}\''.format(url, res.code));
            return None, None;
        file_size_str = r.headers['Content-Length'];
        if file_size_str is not None:
            file_size = int(file_size_str);
        else:
            file_size = None;
        output = io.BytesIO();
        file_size_dl = 0


        if(printstatus):
            if file_size is not None:
                status = '[{:3d} %] Kb {:<6d}{}'.format(0, int(file_size / 1000), url);
            else:
                status = '{:<6d} Kb unkown filesize {}'.format(int(file_size_dl / 1000), url);
            status = status + chr(8)*(len(status));
            print(status,end='');


        while True:
            buf = r.read(self._block_sz);
            if not buf:
                break;
            file_size_dl += len(buf);
            output.write(buf);
            if(printstatus):
                if file_size is not None:
                    status = '[{:3d} %]'.format(int((file_size_dl / file_size) * 100));
                else:
                    status = '{:<6d}'.format(int(file_size_dl / 1000));
                status = status + chr(8)*(len(status))
                print(status,end='');
        if(printstatus):
            print();
        filecontent = output.getvalue();
        output.close()
        r.release_conn()
        return filecontent, url;






# writing the list of all wikia article to a json file
def dowload_list_of_simpsons_wikia_articles():
    content, url = Downloader().get('http://marvelcinematicuniverse.wikia.com/api/v1/Articles/List?limit=2000000000', True)
    with open('list_of_articles.json', 'wb') as f:
        f.write(content)

# load the list of articles
def load_list_of_simpsons_wikia_articles():
    with open('list_of_articles.json', 'r') as f:
        data = json.load(f)
    return data

# converting json file to tsv
def safe_list_of_simpsons_wikia_articles_as_tsv(data):
    with open('list_of_articles.txt', 'w') as f:
        for d in data['items']:
            print('{}\t{}\t{}{}'.format(d['id'],d['title'].replace('\t', ' '), data['basepath'], d['url']),file=f)

def download_all_articles_tsv():
    destdir = 'articles_simple'
    D = Downloader()
    if not os.path.exists(destdir) and os.path.isdir(destdir):
        os.mkdir('articles_simple')
    with open('list_of_articles.txt', 'r') as f:
        i = 0
        for line in f:
            i=i+1
            print(i)
            articleid, _ = line.split('\t',1)
            destfile = os.path.join(destdir, articleid) + '.json'
            if not os.path.exists(destfile) or not os.path.isfile(destfile):
                with open(destfile, 'wb') as fout:
                    content, url = D.get('http://marvelcinematicuniverse.wikia.com/api/v1/Articles/AsSimpleJson?id={}'.format(articleid), True)
                    fout.write(content)

def download_navigation_data():
    content, url = Downloader().get('http://marvelcinematicuniverse.wikia.com/api/v1/Navigation/Data', True)
    with open('navigation_data.json', 'wb') as f:
        f.write(content);

html_template = \
'''<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{title}</title>
    </head>
    <body>
        <!-- <h1>{title}</h1> -->
        <section>
            <h2>Information:</h2>
            <table>
                <tr><td>Title:</td><td>{title}</td></tr>
                <tr><td>Wikia URL:</td><td><a href="{url}">{url}</a></td></tr>
                <tr><td>Article ID:</td><td>{aid}</td></tr>
            </table>
        </section>
{sections}
<section>
{images}
</section>

    </body>
</html>
'''

html_section_template = \
'''<section>
<h2>{section_title}</h2>
{section_contents}
</section>
'''

html_figure_template=\
'''<figure>
    <img src="{img_src}" alt="{img_caption}" />
    <figcaption>{img_caption}</figcaption>
</figure>
'''

def resolve_list(list_of_dicts):
    if not list_of_dicts:
        return ''
    l = '<ul>'
    for d in list_of_dicts:
        try:
            l += '\n<li>{}</li>'.format(d['text'])
            l += resolve_list(d['elements'])

        except:
            print(list_of_dicts)
            print(d)
    l += '</ul>'
    return l

def convert_to_html():
    file = 'list_of_articles.txt'
    dir_ = 'articles_simple'
    with open(file, 'r') as f:
        for line in f:
            splits = line.strip().split('\t')
            article_id = splits[0]
           # print(article_id)
            json_file = os.path.join(dir_, article_id + '.json')
            html_file = os.path.join(dir_, article_id + '.html')

            if not os.path.exists(json_file):
                continue

            with open(json_file) as jf:
                data = json.load(jf)

            sections = ''
            images = ''
            print(splits)
            for section in data['sections']:
                content = ''
                for c in section['content']:
                    if c['type'] == 'paragraph':
                        content += '\n<p>{}</p>'.format(c['text'])
                    elif c['type'] == 'list':
                        content += resolve_list(c['elements'])
                sections += html_section_template.format(
                    section_title=section['title'],
                    section_contents = content)
                images += ''.join([html_figure_template.format(img_src=i['src'], img_caption=i['caption'] if 'caption' in i else '' ) for i in section['images']])

            with open(html_file, 'w', encoding='utf-8') as hf:
                hf.write(html_template.format(
                    title=splits[1],
                    url=splits[2],
                    aid=splits[0],
                    sections=sections,
                    images=images))

def generate_season_nr():
    file = 'l.txt'
    with open(file, 'r') as f:
        season = 0;
        n_ = 0
        for line in f:
            splits = line.strip().split('\t')
            n = int(splits[1])
            if n == 1 and n_ != 1:
                season += 1
            print('{}\t{}\t{}'.format(splits[0], season, '\t'.join(splits[1:])))   
            n_ = n

# 1.
#dowload_list_of_simpsons_wikia_articles()

# 2.
#data = load_list_of_simpsons_wikia_articles()
#safe_list_of_simpsons_wikia_articles_as_tsv(data)

# 3.
#download_all_articles_tsv()

# 4. select articles
#cut -f4 list_of_simpsons_episodes_with_article_id_sorted_by_name.txt | while read l; do cp articles_simple/${l}.json episode_articles_simple; done

# 5.
#generate_season_nr()

# 6.
#convert_to_html()
