//gecebs9-network description
//Author	LT
//Date		created	2018-05-02
//Date		updated	2018-06-14 removed excessive commented lines of code

'use strict';

/**
 * A sensor reading has been received
 * @param {org.gec.ebs.SensorReading} sensorReading
 * @transaction
 */
async function RecordSensorReading(sensorReading) {  // eslint-disable-line no-unused-vars
	const well = sensorReading.well;
  	console.log('Adding flag ' + sensorReading.fieldtimePTorNPTFlagYesNo + ' to well ' + well.$identifier);

    if (well.sensorReadings) {
        well.sensorReadings.push(sensorReading);
    } else {
        well.sensorReadings = [sensorReading];
    }
  	// add the reading
    const wellRegistry = await getAssetRegistry('org.gec.ebs.Well');
    await wellRegistry.update(well);
}


/**
 * Initialize some test assets and participants useful for running a demo.
  * @param {org.gec.ebs.SetupDemo} notUsed - the SetupDemo transaction
 * @transaction
 */
async function setupDemo() {  // eslint-disable-line no-unused-vars
	const factory	= getFactory();
    const NS		= 'org.gec.ebs';

    // create the WellOwner
    const owner			 = factory.newResource(NS, 'WellOwner', 'owner@email.com');
    const ownerAddress	 = factory.newConcept(NS, 'Address');
    ownerAddress.country = 'CAN';
    owner.address = ownerAddress;
 
    // create the ServiceProvider
    const provider			= factory.newResource(NS, 'ServiceProvider', 'provider@email.com');
    const providerAddress	= factory.newConcept(NS, 'Address');
    providerAddress.country		=	'USA';
  	providerAddress.city		=	'NYC'
  	providerAddress.postalcode	=	'10001'
    provider.address = providerAddress;
      
  	// create the WellContract
    const wellcontract = factory.newResource(NS, 'WellContract', 'WCON_001');
  	wellcontract.activestatus	=	true;

    // create the Well
    const well = factory.newResource(NS, 'Well', 'WELL_001');
    well.wellcontract = factory.newRelationship(NS, 'WellContract', 'WCON_001');
    well.owner = owner;
  
    // add the owners
    const ownerRegistry = await getParticipantRegistry(NS + '.WellOwner');
    await ownerRegistry.addAll([owner]);
  
    // add the operators
    const providerRegistry = await getParticipantRegistry(NS + '.ServiceProvider');
    await providerRegistry.addAll([provider]);
  
    // add the Wells
    const wellRegistry = await getAssetRegistry(NS + '.Well');
    await wellRegistry.addAll([well]);
  
    // add the WellContracts
    const wellcontractRegistry = await getAssetRegistry(NS + '.WellContract');
    await wellcontractRegistry.addAll([wellcontract]);
 }
//LT TODO
/*
    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.gec.ebs', 'SampleEvent');
    event.asset    = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
*/
