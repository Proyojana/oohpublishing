 Ext.require('Ext.chart.*');
 Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox','Ext.Toolbar']);
 Ext.onReady(function() {
    Ext.define('PopulationPoint', {
        extend: 'Ext.data.Model',
        fields: ['state', 'population']
    });
 
var store1 = Ext.create('Ext.data.Store', {
    model: 'PopulationPoint',
    data: [{ state:"Completed", population: 40},
           { state:" Behind Schedule", population: 30},
           { state:" On-Time", population: 20},
           { state:"Ahead of Schedule", population: 20},
              
            ]
  });
 


  var chart = Ext.create('Ext.chart.Chart', {
 	renderTo: Ext.getBody(),
            xtype: 'chart',
            //id: 'chartCmp',
            animate: true,           
            store: store1,
            shadow: true,
            legend: {
                position: 'center',
             
          x:-350,
            y:10,
             width: 450,
        height: 230,
             
            
            },
            insetPadding:400,
            theme: 'Base:gradients',
            
            series: [{
            	
                type: 'pie',                
                field: 'population',
       label: {
                    field: 'state',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial',
                    
               },
               	 showInLegend: true,
               // donut: donut,
                tips: {
                  trackMouse: true,
                   
                 
                  renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 0;
                    store1.each(function(rec) {
                        total += rec.get('population');
                    });
                    this.setTitle(storeItem.get('state') + ': ' + Math.round(storeItem.get('population') / total * 100) + '%');
                  }
                },
                highlight: {
                  segment: {
                    //margin: 20
                  }
                },
                              
            }]
        });

/*Ext.define('MyDesktop.view.projectmanagement.DashboardBarChart' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.dashboardpiechart',
   		id:'dashboardpiechart',
    margin: '10 10 10 10',
    width:530,
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	//requires:['MyDesktop.store.Kras','MyDesktop.view.kras.KrasGrid','MyDesktop.view.kras.KrasAddEditForm'],
    title:'Schedule Chart',
    defaults: {
        
        labelWidth: 90,

    },
    tbar: [{
            text: 'Save Pie Chart',
              pressed: true,
            handler: function() {
                Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                    if(choice == 'yes'){
                        chart.save({
                            type: 'image/png'
                        });
                    }
                });
            }
        }
        ],

   // defaultType: 'textfield',
	
	items:[chart]
}); */

Ext.define('MyDesktop.view.projectmanagement.DashboardBarChart',{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.dashboardpiechart',
   		id:'dashboardpiechart',
   		width:530,
   		//y:60,
   		title:'Schedule chart',
    //margin: '10 10 10 10',   
	   defaults: {
        
        labelWidth: 90,

    },
  

	items:[chart]
	
}); 
});










