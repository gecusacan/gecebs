/*
    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.gec.ebs', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
*/

'use strict';

//gecebs9-network description

/**
 * A shipment has been received by an importer
 * @param {org.gec.ebs.ShipmentReceived} shipmentReceived - the ShipmentReceived transaction
 * @transaction
 */
/* LT
async function payOut(shipmentReceived) {  // eslint-disable-line no-unused-vars

    const contract = shipmentReceived.shipment.contract;
    const shipment = shipmentReceived.shipment;
    let payOut = contract.unitPrice * shipment.unitCount;

    console.log('Received at: ' + shipmentReceived.timestamp);
    console.log('Contract arrivalDateTime: ' + contract.arrivalDateTime);

    // set the status of the shipment
    shipment.status = 'ARRIVED';

    // if the shipment did not arrive on time the payout is zero
    if (shipmentReceived.timestamp > contract.arrivalDateTime) {
        payOut = 0;
        console.log('Late shipment');
    } else {
        // find the lowest temperature reading
        if (shipment.temperatureReadings) {
            // sort the temperatureReadings by centigrade
            shipment.temperatureReadings.sort(function (a, b) {
                return (a.centigrade - b.centigrade);
            });
            const lowestReading = shipment.temperatureReadings[0];
            const highestReading = shipment.temperatureReadings[shipment.temperatureReadings.length - 1];
            let penalty = 0;
            console.log('Lowest temp reading: ' + lowestReading.centigrade);
            console.log('Highest temp reading: ' + highestReading.centigrade);

            // does the lowest temperature violate the contract?
            if (lowestReading.centigrade < contract.minTemperature) {
                penalty += (contract.minTemperature - lowestReading.centigrade) * contract.minPenaltyFactor;
                console.log('Min temp penalty: ' + penalty);
            }

            // does the highest temperature violate the contract?
            if (highestReading.centigrade > contract.maxTemperature) {
                penalty += (highestReading.centigrade - contract.maxTemperature) * contract.maxPenaltyFactor;
                console.log('Max temp penalty: ' + penalty);
            }

            // apply any penalities
            payOut -= (penalty * shipment.unitCount);

            if (payOut < 0) {
                payOut = 0;
            }
        }
    }

    console.log('Payout: ' + payOut);
    contract.grower.accountBalance += payOut;
    contract.importer.accountBalance -= payOut;

    console.log('Grower: ' + contract.grower.$identifier + ' new balance: ' + contract.grower.accountBalance);
    console.log('Importer: ' + contract.importer.$identifier + ' new balance: ' + contract.importer.accountBalance);

    // update the grower's balance
    const growerRegistry = await getParticipantRegistry('org.gec.ebs.Grower');
    await growerRegistry.update(contract.grower);

    // update the importer's balance
    const importerRegistry = await getParticipantRegistry('org.gec.ebs.Importer');
    await importerRegistry.update(contract.importer);

    // update the state of the shipment
    const shipmentRegistry = await getAssetRegistry('org.gec.ebs.Shipment');
    await shipmentRegistry.update(shipment);
}

*/
/**
 * A temperature reading has been received for a shipment
 * @param {org.gec.ebs.TemperatureReading} temperatureReading - the TemperatureReading transaction
 * @transaction
 */
/* LT
async function temperatureReading(temperatureReading) {  // eslint-disable-line no-unused-vars

    const shipment = temperatureReading.shipment;

    console.log('Adding temperature ' + temperatureReading.centigrade + ' to shipment ' + shipment.$identifier);

    if (shipment.temperatureReadings) {
        shipment.temperatureReadings.push(temperatureReading);
    } else {
        shipment.temperatureReadings = [temperatureReading];
    }

    // add the temp reading to the shipment
    const shipmentRegistry = await getAssetRegistry('org.gec.ebs.Shipment');
    await shipmentRegistry.update(shipment);
}
*/

/**
 * A reading has been received for a shipment
 * @param {org.gec.ebs.SensorReading} sensorReading
 * @transaction
 */
async function RecordSensorReading(sensorReading) {  // eslint-disable-line no-unused-vars

    const wellshipment = sensorReading.wellshipment;

	console.log('Adding boolean flag ' + sensorReading.timeFlag + ' to wellshipment ' + wellshipment.$identifier);

    if (wellshipment.sensorReadings) {
        wellshipment.sensorReadings.push(sensorReading);
    } else {
        wellshipment.sensorReadings = [sensorReading];
    }

    // add the temp reading to the shipment
    const wellshipmentRegistry = await getAssetRegistry('org.gec.ebs.WellShipment');
    await wellshipmentRegistry.update(wellshipment);
}


/**
 * Initialize some test assets and participants useful for running a demo.
  * @param {org.gec.ebs.SetupDemo} notUsed - the SetupDemo transaction
 * @transaction
 */
async function setupDemo() {  // eslint-disable-line no-unused-vars

    const factory = getFactory();
    const NS = 'org.gec.ebs';

    // create the WellOwner
    const owner = factory.newResource(NS, 'WellOwner', 'owner@email.com');
    const ownerAddress = factory.newConcept(NS, 'Address');
    ownerAddress.country = 'CAN';
    owner.address = ownerAddress;
 
    // create the WellOperator
    const operator = factory.newResource(NS, 'WellOperator', 'welloperator@email.com');
    const operatorAddress = factory.newConcept(NS, 'Address');
    operatorAddress.country		= 'USA';
  	operatorAddress.city		=	'NYC'
  	operatorAddress.postalcode	=	'10001'
    operator.address = operatorAddress;
  
    // create the grower
  /*
    const grower = factory.newResource(NS, 'Grower', 'farmer@email.com');
    const growerAddress = factory.newConcept(NS, 'Address');
    growerAddress.country = 'USA';
    grower.address = growerAddress;
    grower.accountBalance = 0;
*/
  /*
    // create the importer
    const importer = factory.newResource(NS, 'Importer', 'supermarket@email.com');
    const importerAddress = factory.newConcept(NS, 'Address');
    importerAddress.country = 'UK';
    importer.address = importerAddress;
    importer.accountBalance = 0;
*/
  /*
    // create the shipper
    const shipper = factory.newResource(NS, 'Shipper', 'shipper@email.com');
    const shipperAddress = factory.newConcept(NS, 'Address');
    shipperAddress.country = 'Panama';
    shipper.address = shipperAddress;
    shipper.accountBalance = 0;
*/
  /*
    // create the contract
    const contract = factory.newResource(NS, 'Contract', 'CON_001');
    //contract.grower = factory.newRelationship(NS, 'Grower', 'farmer@email.com');
    //contract.importer = factory.newRelationship(NS, 'Importer', 'supermarket@email.com');
    //contract.shipper = factory.newRelationship(NS, 'Shipper', 'shipper@email.com');
    const tomorrow = setupDemo.timestamp;
    tomorrow.setDate(tomorrow.getDate() + 1);
    contract.arrivalDateTime = tomorrow; // the shipment has to arrive tomorrow
    contract.unitPrice = 0.5; // pay 50 cents per unit
    contract.minTemperature = 2; // min temperature for the cargo
    contract.maxTemperature = 10; // max temperature for the cargo
    contract.minPenaltyFactor = 0.2; // we reduce the price by 20 cents for every degree below the min temp
    contract.maxPenaltyFactor = 0.1; // we reduce the price by 10 cents for every degree above the max temp
*/  
    // create the WellContract
    const wellcontract = factory.newResource(NS, 'WellContract', 'WCON_001');
  	wellcontract.activestatus	=	true;
/*  
    // create the shipment
    const shipment = factory.newResource(NS, 'Shipment', 'SHIP_001');
    shipment.type = 'BANANAS';
    shipment.status = 'IN_TRANSIT';
    shipment.unitCount = 5000;
    shipment.contract = factory.newRelationship(NS, 'Contract', 'CON_001');
*/
    // create the wellshipment
    const wellshipment = factory.newResource(NS, 'WellShipment', 'WSHIP_001');
    wellshipment.wellcontract = factory.newRelationship(NS, 'WellContract', 'WCON_001');
    wellshipment.owner = owner;
    // add the owners
    const ownerRegistry = await getParticipantRegistry(NS + '.WellOwner');
    await ownerRegistry.addAll([owner]);
  
    // add the owners
    const operatorRegistry = await getParticipantRegistry(NS + '.WellOperator');
    await operatorRegistry.addAll([operator]);
/*
    // add the growers
    const growerRegistry = await getParticipantRegistry(NS + '.Grower');
    await growerRegistry.addAll([grower]);

    // add the importers
    const importerRegistry = await getParticipantRegistry(NS + '.Importer');
    await importerRegistry.addAll([importer]);

    // add the shippers
    const shipperRegistry = await getParticipantRegistry(NS + '.Shipper');
    await shipperRegistry.addAll([shipper]);
*/
/*
    // add the contracts
    const contractRegistry = await getAssetRegistry(NS + '.Contract');
    await contractRegistry.addAll([contract]);
*/  
    // add the wellcontracts
    const wellcontractRegistry = await getAssetRegistry(NS + '.WellContract');
    await wellcontractRegistry.addAll([wellcontract]);
/*
    // add the shipments
    const shipmentRegistry = await getAssetRegistry(NS + '.Shipment');
    await shipmentRegistry.addAll([shipment]);
*/
    // add the shipments
    const wshipmentRegistry = await getAssetRegistry(NS + '.WellShipment');
    await wshipmentRegistry.addAll([wellshipment]);
 }
