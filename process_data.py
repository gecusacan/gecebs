# process_data.py
# Author: LT
# file reads data from the file line-by-line and generates corresponding curl commands for business network

#f = open('data.txt','r')
#line = f.read()
#print('TEST:' + line)


print('========SHOW INPUT FILE CONTENTS:==========================')
with open ('data.txt') as f:
	for line in f:
		print(line)
f.close()

print('===========================================================')
with open("data.txt", "r") as f:
	data = f.readlines()
	print("EXAMPLE curl command for each row in the Well's sensor data file")
	print("FYI: wellshipment (i.e. actual Well #1) is hard-coded to the value WSHIP_001 for now")
	print('===========================================================')
	for line in data:
		data = line.split()
		#print row
		print data
		#print ("curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \"$class\": \"org.gec.ebs.SensorReading\", \"fieldtimePTorNPTFlagYesNo\": \"PT\", \"fieldTimeStamp\": \"2018-05-14T20:17:19.340Z\", \"wellshipment\": \"WSHIP_001\", \"timestamp\": \"2018-05-14T20:17:19.340Z\" }' 'http://localhost:3000/api/org.gec.ebs.SensorReading'")
		##print row elements
		#print data[0]
		#print data[1]
		
		# TODO: convert 0,1 or -1 to PT NPT or UNK	
		#default Error value that will be rejected
		timeIndicator = "\"" + "XX" + "\""
		
		if data[1] == '0':
			timeIndicator = "\"" + "UNK" + "\""
		if data[1] == '-1':
			timeIndicator = "\"" + "NPT" + "\""
		if data[1] == '1':
			timeIndicator = "\"" + "PT" + "\""

		wellId = "\"" + 'WELL_001' + "\""

		# hard-coded for now
		##timeIndicator = "\"" + "UNK" + "\""
		
		#print ("curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \"$class\": \"org.gec.ebs.SensorReading\", \"fieldtimePTorNPTFlagYesNo\": \"PT\", \"fieldTimeStamp\": \"2018-05-14T20:17:19.340Z\", \"wellshipment\": " + shipment + ", \"timestamp\": \"2018-05-14T20:17:19.340Z\" }' 'http://localhost:3000/api/org.gec.ebs.SensorReading'")
		#print ("curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \"$class\": \"org.gec.ebs.SensorReading\", \"fieldtimePTorNPTFlagYesNo\": " + timeIndicator + ", \"fieldTimeStamp\": \"2018-05-14T20:17:19.340Z\", \"wellshipment\": " + shipment + ", \"timestamp\": \"2018-05-14T20:17:19.340Z\" }' 'http://localhost:3000/api/org.gec.ebs.SensorReading'")
		
		print ("curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{ \"$class\": \"org.gec.ebs.SensorReading\", \"fieldtimePTorNPTFlagYesNo\": " + timeIndicator + ", \"fieldTimeStamp\": \"2018-05-14T20:17:19.340Z\", \"wellId\": " + wellId + ", \"timestamp\": \"2018-05-14T20:17:19.340Z\" }' 'http://localhost:3000/api/org.gec.ebs.SensorReading'")
