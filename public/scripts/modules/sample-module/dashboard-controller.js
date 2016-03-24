define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardsCtrl', ['$scope', '$log', 'PredixAssetService', 'PredixViewService', function ($scope, $log, PredixAssetService, PredixViewService) {

        PredixAssetService.getAssetsByParentId('root').then(function (initialContext) {
            $scope.initialContexts = initialContext;
        }, function (message) {
            $log.error(message);
        });

        $scope.decks = [];
        $scope.selectedDeckUrl = null;

        // callback for when the Open button is clicked
        $scope.openContext = function (contextDetails) {
        	//  debugger;
            // need to clean up the context details so it doesn't have the infinite parent/children cycle,
            // which causes problems later (can't interpolate: {{context}} TypeError: Converting circular structure to JSON)
            var newContext = angular.copy(contextDetails);
            newContext.children = [];
            newContext.parent = [];

            $scope.context = newContext;
            var selectedItemIdVal = newContext.id;
            console.log(selectedItemIdVal);
            document.getElementById("myValueAttr").value = selectedItemIdVal;
            console.log(document.getElementById("myValueAttr").value);
            
            	    if (selectedItemIdVal == "parent"){
            	    	var json = 
              	    	  [{"lat":33.5995, "lng":-84.5485, "title":'Atlanta', "CMR_Flag":'C',"ContractName":'Contract1',"P6Score":'20.5%'},
              	    	   {"lat":32.7825, "lng":-96.7768, "title":'Dallas', "CMR_Flag":'P',"ContractName":'Contract2',"P6Score":'90.6%'},
              	    	   {"lat":41.7844, "lng":-87.6024, "title":'Chicago', "CMR_Flag":'C',"ContractName":'Contract3',"P6Score":'12%'},
              	    	   {"lat":32.7869, "lng":-89.205, "title":'Philadelphia', "CMR_Flag":'P',"ContractName":'Contract4',"P6Score":'45%'},
              	    	   {"lat":34.6475, "lng":-118.1456, "title":'Los Angeles', "CMR_Flag":'C',"ContractName":'Contract6',"P6Score":'59%'},
              	    	   {"lat":29.7604, "lng":-95.3698, "title":'Houston Oil & Gas',"CMR_Flag":'C',"ContractName":'Contract6',"P6Score":'59%'}];
              	    
            	    } else if(selectedItemIdVal == "parent1"){
            	    	var json = 
            	    	  [{"lat":51.4648, "lng":0.1821, "title":'Dartford', "CMR_Flag":'P',"ContractName":'Contract2',"P6Score":'90.6%'},
            	    	   {"lat":47.1625, "lng":19.5033, "title":'Hungary', "CMR_Flag":'C',"ContractName":'Contract3',"P6Score":'12%'},
            	    	   {"lat":29.9476, "lng":78.1063, "title":'Turbine', "CMR_Flag":'P',"ContractName":'Contract4',"P6Score":'45%'},
            	    	 	{"lat":50.8458, "lng":5.6872, "title":'Belfort', "CMR_Flag":'C',"ContractName":'Contract6',"P6Score":'59%'}
            	    	   ];
    	      			            
            	    }else if (selectedItemIdVal == "parent2"){
            	    	var json = 
              	    	  [{"lat":26.399, "lng":50.1419, "title":'MEELSA', "CMR_Flag":'C',"ContractName":'Contract3',"P6Score":'12%'}
              	    	   ];
            	    } else if (selectedItemIdVal == "parent3"){
            	    	var json = 
              	    	  [{"lat":17.5931, "lng":78.4047, "title":'BHEL', "CMR_Flag":'C',"ContractName":'Contract3',"P6Score":'12%'},
              	    	   {"lat":50.9172, "lng":6.6907, "title":'Keppel', "CMR_Flag":'P',"ContractName":'Contract4',"P6Score":'45%'},
              	    	   {"lat":38.2376, "lng":-76.1269, "title":'PT', "CMR_Flag":'C',"ContractName":'Contract6',"P6Score":'59%'},
              	    	   {"lat":43.4846, "lng":-91.1906, "title":'GEESA', "CMR_Flag":'C',"ContractName":'Contract6',"P6Score":'59%'}
              	    	   ];
            	    }
            	    else if (selectedItemIdVal == "parent4"){
            	    	var json = 
              	    	  [{"lat":17.5931, "lng":78.4047, "title":'BHEL', "CMR_Flag":'C',"ContractName":'Contract1',"P6Score":'20.5%'},
              	    	   {"lat":50.9172, "lng":6.6907, "title":'Keppel', "CMR_Flag":'P',"ContractName":'Contract2',"P6Score":'90.6%'},
              	    	   ];
            	    }
            	    else {
            	    	var json = 
            	    	  [{"lat":33.5995, "lng":-84.5485, "title":'Atlanta', "CMR_Flag":'C',"ContractName":'Contract1',"P6Score":'20.5%'},
            	    	  {"lat":51.5761, "lng":0.4887, "title":'Basildon', "CMR_Flag":'P',"ContractName":'Contract2',"P6Score":'90.6%'},
            	    	  {"lat":45.5679, "lng":-73.2039, "title":'Beloeil', "CMR_Flag":'C',"ContractName":'Contract3',"P6Score":'12%'},
            	    	  {"lat":17.5931, "lng":78.4047, "title":'BHEL', "CMR_Flag":'P',"ContractName":'Contract4',"P6Score":'45%'},
            	    	  {"lat":42.9963, "lng":-78.7954, "title":'Buffalo',"CMR_Flag":'P',"ContractName":'Contract5',"P6Score":'89%'},
            	    	  {"lat":43.3751, "lng":-79.7756, "title":'Burlington', "CMR_Flag":'C',"ContractName":'Contract6',"P6Score":'59%'}
            	    	  ];
            	    }
            	    
                    for (var i = 0, length = json.length; i < length; i++) {
                  	  var gmap = document.querySelector('google-map');
                  	gmap.clear();
                  	  var data = json[i];
                  	  var marker = document.createElement('google-map-marker');
                    marker.setAttribute('latitude', data.lat);
                    marker.setAttribute('longitude', data.lng);
                    marker.setAttribute('title', data.title);
                    if(data.CMR_Flag == "C"){
                  	marker.setAttribute('icon','http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                    }else {
                  	  marker.setAttribute('icon','http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
                    }
                    
                   //marker.setAttribute('info','<p id="hook">Hello World!</p>');
                    marker.innerHTML = '<div id="iw-container">' +
                    '<div class="iw-content">' +
                     '<div class="iw-subTitle"><i class="fa fa-info-circle" style="padding-right:20px"></i>'+data.title+'</div>' +
                      /*'<img src="images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">' + */
                     '<table class="table2"><tr><td style="color: #005cb9;font-size: 17px;">Contract Name</td>'+
                     '<td style="color: #005cb9;font-size: 17px;padding-left: 32px;">P6 Score</td></tr><tr><td><a style="color:#000000;text-decoration: blink !important;" href="#">'+data.ContractName+'</a>'+
                     '</td><td style="color:#000000;padding-left: 57px;">'+data.P6Score+'</td></tr><tr><td><a style="color:#000000;text-decoration: blink !important;" href="#">Contract8</a></td><td style="color:#000000;padding-left: 57px;">'+data.P6Score+'</td></tr></table>'+
                      
                    '</div>' +
                  '</div>';  
              Polymer.dom(gmap).appendChild(marker);
                    }
                    
                    tableData(selectedItemIdVal);
                    
                    function tableData(val){
         	    	   if(document.getElementById("myValueAttr").value == "parent"){
         	            	  var json1 = [{"Site":'<label style=\'color: #000000;\'>Atlanta</label>',"Date":"<label style=\'color: #000000;\'>01-02-2016</label>"},
         	      			            {"Site":'<label style=\'color: #000000;\'>Dallas</label>',"Date":"<label style=\'color: #000000;\'>16-02-2016</label>"},
         	      			            {"Site":'<label style=\'color: #000000;\'>Chicago</label>', "Date":"<label style=\'color: #000000;\'>01-03-2016</label>"},
         	      			            {"Site":'<label style=\'color: #000000;\'>Philadelphia</label>', "Date":"<label style=\'color: #000000;\'>05-03-2016</label>"},
         	      			            {"Site":'<label style=\'color: #000000;\'>Los Angeles</label>',"Date":"<label style=\'color: #000000;\'>10-03-2016</label>"},
         	      			            {"Site":'<label style=\'color: #000000;\'>Houston</label>', "Date":"<label style=\'color: #000000;\'>31-03-2016</label>"}];
         	              } else if(document.getElementById("myValueAttr").value == "parent1"){
         	            	  var json1 = [{"Site":'<label style=\'color: #000000;\'>Turbine</label>',"Date":"<label style=\'color: #000000;\'>01-02-2016</label>"},
             	      			            {"Site":'<label style=\'color: #000000;\'>Dartford</label>',"Date":"<label style=\'color: #000000;\'>16-02-2016</label>"},
             	      			            {"Site":'<label style=\'color: #000000;\'>Hungary</label>', "Date":"<label style=\'color: #000000;\'>01-03-2016</label>"},
             	      			            {"Site":'<label style=\'color: #000000;\'>Belfort</label>', "Date":"<label style=\'color: #000000;\'>05-03-2016</label>"}
             	      			           ];
         	              } else if (document.getElementById("myValueAttr").value == "parent2"){
         	            		var json1 = [{"Site":'<label style=\'color: #000000;\'>MEELSA</label>',"Date":"<label style=\'color: #000000;\'>01-02-2016</label>"}];
         	            	
         	              }else if (document.getElementById("myValueAttr").value == "parent3"){
         	            		var json1 = [{"Site":'<label style=\'color: #000000;\'>BHEL</label>',"Date":"<label style=\'color: #000000;\'>01-02-2016</label>"},
                	      			            {"Site":'<label style=\'color: #000000;\'>Keppel</label>',"Date":"<label style=\'color: #000000;\'>16-02-2016</label>"},
              	      			            {"Site":'<label style=\'color: #000000;\'>PT</label>', "Date":"<label style=\'color: #000000;\'>01-03-2016</label>"},
              	      			            {"Site":'<label style=\'color: #000000;\'>GEESA</label>', "Date":"<label style=\'color: #000000;\'>05-03-2016</label>"}
              	      			           ];
         	              } else if (document.getElementById("myValueAttr").value == "parent4"){
         	            	  var json1 = [{"Site":'<label style=\'color: #000000;\'>BHEL</label>',"Date":"<label style=\'color: #000000;\'>01-02-2016</label>"},
             	      			            {"Site":'<label style=\'color: #000000;\'>Keppel</label>',"Date":"<label style=\'color: #000000;\'>16-02-2016</label>"}
             	      			            ];
         	              } else {
         	            	  var json1 = [{"Site":'<label style=\'color: #000000;\'>Atlanta</label>',"Date":"<label style=\'color: #000000;\'>01-02-2016</label>"},
             	      			            {"Site":'<label style=\'color: #000000;\'>Basildon</label>',"Date":"<label style=\'color: #000000;\'>16-02-2016</label>"},
             	      			            {"Site":'<label style=\'color: #000000;\'>Beloeil</label>', "Date":"<label style=\'color: #000000;\'>01-03-2016</label>"},
             	      			            {"Site":'<label style=\'color: #000000;\'>BHEL</label>', "Date":"<label style=\'color: #000000;\'>05-03-2016</label>"},
             	      			            {"Site":'<label style=\'color: #000000;\'>Buffalo</label>',"Date":"<label style=\'color: #000000;\'>10-03-2016</label>"},
             	      			            {"Site":'<label style=\'color: #000000;\'>Burlington</label>', "Date":"<label style=\'color: #000000;\'>31-03-2016</label>"}];
             	      			           
         	              }
         	    	   var tableDtl = document.querySelector('px-card-dashboard');
         	    	  var resp = this;
         	      			var serviceUrl = "";
         	      		  var self = tableDtl;
         	      		tableDtl.getData(serviceUrl).then(function(data) {
         	      		self.data= data.response;
         		            self.json1 = json1;
         		           var myInput = document.getElementById('dataTable');
         		          myInput.setAttribute('style', 'padding-bottom: 47px;');
         		          console.log(myInput.getAttribute('style'));
         		            }); 
         	    }
         	    

            
            //Tag string can be classification from contextDetails
            PredixViewService.getDecksByTags(newContext.classification) // gets all decks for this context
                .then(function (decks) {
                	console.log(decks);
                    $scope.decks = [];

                    if(decks && decks.length > 0) {
                        decks.forEach(function (deck) {
                            $scope.decks.push({name: deck.title, url: PredixViewService.getUrlForFetchingCardsForDeckId(deck.id)});
                            console.log($scope.decks)
                        });
                        $scope.selectedDeckUrl = $scope.decks[0].url;
                        console.log(selectedDeckUrl);
                    }
                });
        };
        $scope.getChildren = function (parent, options) {
            return PredixAssetService.getAssetsByParentId(parent.id, options);
        };

        $scope.handlers = {
            itemOpenHandler: $scope.openContext,
            getChildren: $scope.getChildren,
            itemClickHandler: $scope.clickHandler
        };
    }]);
    
	/*$(function () {
	    $('#container').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Stacked column chart'
	        },
	        xAxis: {
	            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Total fruit consumption'
	            },
	            stackLabels: {
	                enabled: true,
	                style: {
	                    fontWeight: 'bold',
	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                }
	            }
	        },
	        legend: {
	            align: 'right',
	            x: -30,
	            verticalAlign: 'top',
	            y: 25,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	            borderColor: '#CCC',
	            borderWidth: 1,
	            shadow: false
	        },
	        tooltip: {
	            headerFormat: '<b>{point.x}</b><br/>',
	            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
	        },
	        plotOptions: {
	            column: {
	                stacking: 'normal',
	                dataLabels: {
	                    enabled: true,
	                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                    style: {
	                        textShadow: '0 0 3px black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'John',
	            data: [5, 3, 4, 7, 2]
	        }, {
	            name: 'Jane',
	            data: [2, 2, 3, 2, 1]
	        }, {
	            name: 'Joe',
	            data: [3, 4, 4, 2, 5]
	        }]
	    });
	});*/
});
