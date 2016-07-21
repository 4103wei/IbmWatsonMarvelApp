from justdoit import *
import re
from parse import *
import os


"""
@author: Wei
@e-mail: jerryjerry4103@gmail.com
@last updated on 5/22/2016
"""


FILEPATH = 'articles_simple'


def isInfoBox(url):
    downloader = Downloader()
    content, url = downloader.get(url, False)
    content = content.decode("utf-8")
    return ("portable-infobox" in content)


# converting the HTML string from the website to a list of relevant information
def getInfoBox(url):
    tables = []
    if (isInfoBox(url)):
        downloader = Downloader()
        content, url = downloader.get(url, False)
        content = content.decode("utf-8")
        infoboxes = re.findall("<aside class=\"portable-infobox.*?</aside>", content, re.DOTALL)
        # for each infobox ...
        for infobox in infoboxes:
            titles = re.findall('<font size="\+1">(.*?)</font>', infobox, re.DOTALL)
            images = re.findall('<img src="(.*?)" class="pi-image-thumbnail"', infobox, re.DOTALL)
            data_raw = re.findall('<h3 class="pi-data-label pi-secondary-font">(.*?)</h3>.*?<div class="pi-data-value pi-font">(.*?)</div>', infobox, re.DOTALL)
            data = []
            for d in data_raw:
                data.append((d[0], striphtml(d[1].replace('<br />', ', '))))
            tables.append((titles, images, data))
    return tables



# remove the html tags
def striphtml(data):
    p = re.compile(r'<.*?>')
    return p.sub('', data)


# main
number_of_files = len([file for file in os.listdir(FILEPATH) if file.endswith('.html')])
progress = 0
skipped_files = 0
for fn in os.listdir(FILEPATH):
    if fn.endswith('.html'):
        if progress > -1:
            file = open(FILEPATH+'/'+fn, 'r+', encoding="utf8")
            file_raw = file.read()
            link = re.findall('<tr><td>Wikia URL:</td><td><a href="(.*?)">',file_raw, re.DOTALL)[0]
            try:
                tables = getInfoBox(link)
            except:
                print("website was deleted, could not retrieve information, skip.")
                skipped_files += 1
                continue
            infobox_counter = 0
            for table in tables:
                infobox_counter += 1
                file.write("<section><h2>Infobox "+ str(infobox_counter) + ":</h2><table>")
                for title in table[0]:
                    file.write("<tr><td>Title:</td><td>" + title + "</td></tr>")
                for pic in table[1]:
                    file.write("<tr><td><img src='" + pic + "'></td></tr>")
                for inf in table[2]:
                    file.write("<tr><td>"+inf[0]+":</td><td>" + inf[1] + "</td></tr>")
                file.write("</table></section>")
        progress += 1
        print( str(int(progress/number_of_files*100)) + '% - files processed: ' + str(progress) + '/' + str(number_of_files) + ' - last file: ' + fn)
print("Process finished. Files skipped: " + str(skipped_files))