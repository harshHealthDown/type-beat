import json

index = []
display = []
dis = {}
with open('dictionary.json') as json_file:
  data = json.load(json_file)
  print("Type: ",type(data))
  for i in data.keys():
    display.append(i)
    dis[i] = 1

arr = list(dis.keys())
for i in range(len(arr)-1):
  if i==0:
    index.append(i)
    continue
  if arr[i][:1]!=arr[i-1][:1]:
    index.append(i)
print(len(index),index)
with open('dict.txt',"w") as file:
  file.write(str(display))
index.append(len(display))
print(index[:-1])
with open('idx.txt',"w") as file:
  file.write(str(index))