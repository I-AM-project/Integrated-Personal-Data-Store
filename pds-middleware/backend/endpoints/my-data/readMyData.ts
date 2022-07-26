import fetch from "node-fetch"


const myDataQuery = `PREFIX cco: <http://www.ontologyrepository.com/CommonCoreOntologies/>
PREFIX obo: <http://purl.obolibrary.org/obo/>
SELECT * WHERE { 
{
    SELECT ?PersonGivenNameIRI ?FirstName ?VerifiableCredential WHERE {
		?Person a cco:Person ;
				cco:designated_by ?PersonFullName; .  
		?PersonFullName a cco:PersonFullName ;
						<http://purl.obolibrary.org/obo/BFO_0000051> ?PersonGivenNameIRI .
		?PersonGivenNameIRI a cco:PersonGivenName ;
						<http://purl.obolibrary.org/obo/RO_0010001>  ?PersonGivenNameIBE . 
		?PersonGivenNameIBE cco:has_text_value ?FirstName;
							obo:BFO_0000050 ?VerifiableCredentialIRI. 
		?VerifiableCredentialIRI cco:designated_by ?VerifiableCredential_desc . 
		?VerifiableCredential_desc cco:has_text_value ?VerifiableCredential .   
	}
}
UNION
{
   SELECT ?Person ?LastName ?Signature ?keyPairName WHERE 
    {
         ?Person a cco:Person ;
                 cco:designated_by ?PersonFullName; . 
                 
         ?PersonFullName a cco:PersonFullName ;
                  <http://purl.obolibrary.org/obo/BFO_0000051> ?PersonFamilyName.
     		?PersonFamilyName a cco:PersonFamilyName ;
                    <http://purl.obolibrary.org/obo/RO_0010001> ?PersonFamilyNameIBE. 
  
  			?PersonFamilyNameIBE cco:has_text_value ?LastName ;
        obo:RO_0000056 ?RSASignature. 
          ?RSASignature a cco:RSASignature ; 
            obo:RO_0000056 ?keyPair; 
            cco:has_text_value ?Signature . 
          ?keyPair a cco:RSAKeyPair; 
            cco:designated_by ?keyPairDesc . 
          ?keyPairDesc obo:RO_0010001 ?keyPairDescIBE.
          ?keyPairDescIBE cco:has_text_value ?keyPairName .  
  
    }
}
 UNION
{
   SELECT ?Person ?Birthday ?Signature ?keyPairName WHERE 
    {
         ?Person a cco:Person ;
                 cco:is_object_of ?Birth. 
      ?Birth a cco:Birth;
         cco:occurs_on ?Birth_Day. 
  
  # Date Of Birth
  ?Birth_Day a cco:Day;
             cco:designated_by ?DataIdentifier . 
  
  ?DataIdentifier <http://purl.obolibrary.org/obo/RO_0010001> ?DataIdentifierIBE . 
  
  ?DataIdentifierIBE  cco:has_text_value ?Birthday ;
  obo:RO_0000056 ?RSASignature. 
          ?RSASignature a cco:RSASignature ; 
            obo:RO_0000056 ?keyPair; 
            cco:has_text_value ?Signature . 
          ?keyPair a cco:RSAKeyPair; 
            cco:designated_by ?keyPairDesc . 
          ?keyPairDesc obo:RO_0010001 ?keyPairDescIBE.
          ?keyPairDescIBE cco:has_text_value ?keyPairName . 
        
  
    }
}
UNION
{
   SELECT ?Person ?MailingStreet ?Signature ?keyPairName WHERE 
    {
      ?Person a cco:Person;
      cco:agent_in ?ActOfResiding.

     ?ActOfResiding a cco:ActOfResiding;
       obo:RO_0000057 ?ResidentialFacility.

      ?ResidentialFacility a cco:ResidentialFacility;
        cco:designated_by ?StreetAdress.

      ?StreetAdress a cco:StreetAddress;
        obo:RO_0010001 ?StreetAdressIBE .

      ?StreetAdressIBE a cco:InformationBearingEntity;
        cco:has_text_value  ?MailingStreet ;
        obo:RO_0000056 ?RSASignature.  

       
        ?RSASignature a cco:RSASignature ; 
          obo:RO_0000056 ?keyPair; 
          cco:has_text_value ?Signature . 
        ?keyPair a cco:RSAKeyPair; 
          cco:designated_by ?keyPairDesc . 
        ?keyPairDesc obo:RO_0010001 ?keyPairDescIBE.
        ?keyPairDescIBE cco:has_text_value ?keyPairName  . 
    }
}
UNION
{
   SELECT ?Person ?MailingPostCode  ?Signature ?keyPairName WHERE 
    {
      ?Person a cco:Person;
        cco:agent_in ?ActOfResiding.

    ?ActOfResiding a cco:ActOfResiding;
      obo:RO_0000057 ?ResidentialFacility.

    ?ResidentialFacility a cco:ResidentialFacility;
      obo:RO_0001025 ?PostalZone . 
      
    ?PostalZone a cco:PostalZone;
      cco:designated_by ?PostalCode.

    ?PostalCode a cco:PostalCode;
      obo:RO_0010001 ?PostalCodeIBE.

    ?PostalCodeIBE a cco:InformationBearingEntity;
      cco:has_text_value ?MailingPostCode;
      obo:RO_0000056 ?RSASignature.  

       
      ?RSASignature a cco:RSASignature ; 
        obo:RO_0000056 ?keyPair; 
        cco:has_text_value ?Signature . 
      ?keyPair a cco:RSAKeyPair; 
        cco:designated_by ?keyPairDesc . 
      ?keyPairDesc obo:RO_0010001 ?keyPairDescIBE.
      ?keyPairDescIBE cco:has_text_value ?keyPairName  . 
  
    }
}
 UNION
{
  SELECT ?Person  ?MailingCity  ?Signature ?keyPairName ?p ?o WHERE 
  {
       ?Person a cco:Person ;
               cco:agent_in ?ActOfResiding . 
               
      ?ActOfResiding a cco:ActOfResiding ; 
               obo:RO_0000057 ?ResidentialFacility. 
    ?ResidentialFacility a cco:ResidentialFacility;
           obo:RO_0001025 ?LocalAdminRegion1. 
                     
   # Admin Region
?LocalAdminRegion1 a cco:LocalAdministrativeRegion ; 
                   cco:designated_by ?LocalAdminRegion1DesName . 
                    #City 
?LocalAdminRegion1DesName a cco:DesignativeName;
                          obo:RO_0010001  ?LocalAdminRegion1DesNameIBE. 

?LocalAdminRegion1DesNameIBE cco:has_text_value ?MailingCity ;
    obo:RO_0000056 ?RSASignature. 
        ?RSASignature a cco:RSASignature ; 
          obo:RO_0000056 ?keyPair; 
          cco:has_text_value ?Signature . 
        ?keyPair a cco:RSAKeyPair; 
          cco:designated_by ?keyPairDesc . 
        ?keyPairDesc obo:RO_0010001 ?keyPairDescIBE.
        ?keyPairDescIBE cco:has_text_value ?keyPairName . 
  }
}
 UNION
{
   SELECT ?Person  ?MailingState ?Signature ?keyPairName WHERE 
    {
         ?Person a cco:Person ;
                 cco:agent_in ?ActOfResiding . 
                 
     	 ?ActOfResiding a cco:ActOfResiding ; 
        obo:RO_0000057 ?ResidentialFacility. 
  		?ResidentialFacility a cco:ResidentialFacility;
             <http://purl.obolibrary.org/obo/RO_0001025> ?LocalAdminRegion1. 
                       
 		# Admin Region
  ?LocalAdminRegion1 a cco:LocalAdministrativeRegion ; 
                     <http://purl.obolibrary.org/obo/BFO_0000050> ?LocalAdminRegion1StateCity . 
  
 ?LocalAdminRegion1StateCity a cco:State ; 
                              cco:designated_by ?LocalAdminRegion1StateCityDesc. 
  
  
 ?LocalAdminRegion1StateCityDesc a cco:DesignativeName ; 
                                  <http://purl.obolibrary.org/obo/RO_0010001>   ?LocalAdminRegion1StateCityDescIBE . 
  
  
  ?LocalAdminRegion1StateCityDescIBE a cco:InformationBearingEntity ;
       cco:has_text_value ?MailingState;
  obo:RO_0000056 ?RSASignature. 
          ?RSASignature a cco:RSASignature ; 
            obo:RO_0000056 ?keyPair; 
            cco:has_text_value ?Signature . 
          ?keyPair a cco:RSAKeyPair; 
            cco:designated_by ?keyPairDesc . 
          ?keyPairDesc obo:RO_0010001 ?keyPairDescIBE.
          ?keyPairDescIBE cco:has_text_value ?keyPairName . 
  
    }
}
  UNION
{
   SELECT ?Person  ?MailingCountry ?Signature ?keyPairName WHERE 
    {
         ?Person a cco:Person ;
                 cco:agent_in ?ActOfResiding . 
                 
     	 ?ActOfResiding a cco:ActOfResiding ; 
        obo:RO_0000057 ?ResidentialFacility. 
  		?ResidentialFacility a cco:ResidentialFacility;
             <http://purl.obolibrary.org/obo/RO_0001025> ?LocalAdminRegion1. 
                       
 		# Admin Region
  ?LocalAdminRegion1 a cco:LocalAdministrativeRegion ; 
                     <http://purl.obolibrary.org/obo/BFO_0000050> ?LocalAdminRegion1StateCity . 
  
 ?LocalAdminRegion1StateCity a cco:State ; 
	<http://purl.obolibrary.org/obo/BFO_0000050> ?LocalAdminRegion1StateCountry. 
  ?LocalAdminRegion1StateCountry a cco:Country ; 
                cco:designated_by ?CountryDesc  . 
      
  ?CountryDesc a cco:DesignativeName ; 
    <http://purl.obolibrary.org/obo/RO_0010001> ?CountryDescIBE .  
  
  ?CountryDescIBE cco:has_text_value ?MailingCountry;
  obo:RO_0000056 ?RSASignature. 
          ?RSASignature a cco:RSASignature ; 
            obo:RO_0000056 ?keyPair; 
            cco:has_text_value ?Signature . 
          ?keyPair a cco:RSAKeyPair; 
            cco:designated_by ?keyPairDesc . 
          ?keyPairDesc obo:RO_0010001 ?keyPairDescIBE.
          ?keyPairDescIBE cco:has_text_value ?keyPairName . 
  
    }
}      UNION
{
   SELECT ?Person  ?Weight ?Signature ?keyPairName WHERE 
    {
        ?Person a cco:Person;
                 cco:has_quality ?WeightQuality . 
 		?WeightQuality a cco:Weight;
            cco:is_measured_by ?WeightQualityICE .    
      
      ?WeightQualityICE obo:RO_0000056 ?WeightQualityIBE . 
      
      ?WeightQualityIBE  cco:has_text_value ?Weight ; 
        obo:RO_0000056 ?RSASignature. 
          ?RSASignature a cco:RSASignature ; 
            obo:RO_0000056 ?keyPair; 
            cco:has_text_value ?Signature . 
          ?keyPair a cco:RSAKeyPair; 
            cco:designated_by ?keyPairDesc . 
          ?keyPairDesc obo:RO_0010001 ?keyPairDescIBE.
          ?keyPairDescIBE cco:has_text_value ?keyPairName . 
  
    }
}UNION{
  SELECT ?Person ?Email ?Signature ?keyPairName  WHERE 
    {
         ?Person a cco:Person ;
                 cco:uses ?EmailBox . 
          ?EmailBox a cco:EmailBox;
                    obo:RO_0000056 ?StasisOfTelecommunicationEndpointAssignment . 
  
  		?StasisOfTelecommunicationEndpointAssignment a cco:StasisOfTelecommunicationEndpointAssignment ; 
                        obo:RO_0000057 ?TelecommunicationEndpoint . 
  
  		?TelecommunicationEndpoint a cco:TelecommunicationEndpoint ;
                               cco:designated_by ?EmailAddress . 
  			?EmailAddress a cco:EmailAddress;
                   obo:RO_0010001 ?EmailIBE .
  
  	?EmailIBE cco:has_text_value ?Email ; 
 	obo:RO_0000056 ?RSASignature. 
          ?RSASignature a cco:RSASignature ; 
            obo:RO_0000056 ?keyPair; 
            cco:has_text_value ?Signature . 
          ?keyPair a cco:RSAKeyPair; 
            cco:designated_by ?keyPairDesc . 
          ?keyPairDesc obo:RO_0010001 ?keyPairDescIBE.
          ?keyPairDescIBE cco:has_text_value ?keyPairName . 
    }
}     
}`


function readMyData(callback: ({ success: boolean, data: string }) => void) {
	fetch(`http://${process.env.API_LOCATION}:3030/MyData/sparql`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/sparql-query',
			'Accept': 'application/json'
		},
		body: myDataQuery
	}).then(res => res.text()).then(data => {
		let jsonResults = JSON.parse(data)
		callback({
			success: true,
			data: jsonResults.results.bindings
		})
	}).catch((error) => {
		callback({
			success: false,
			data: error
		})
	})
}

export default readMyData 