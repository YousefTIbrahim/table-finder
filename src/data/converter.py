import csv

csv_path = 'WeddingGuests.csv'
js_path = 'guestsList.js'

with open(csv_path, newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    guests = [{"name": row["name"].strip(), "table": int(row["table"])} for row in reader]

with open(js_path, 'w', encoding='utf-8') as jsfile:
    jsfile.write("export const guests = [\n")
    for guest in guests:
        jsfile.write(f'  {{ name: "{guest["name"]}", table: {guest["table"]} }},\n')
    jsfile.write("];\n")
