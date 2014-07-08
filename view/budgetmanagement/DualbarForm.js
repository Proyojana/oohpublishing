Ext.require('Ext.chart.*');
Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);
 Ext.onReady(function() {
    Ext.define('PopulationPoint', {
        extend: 'Ext.data.Model',
        fields: ['Actual', 'Budget','name']
    });
 
var values = Ext.create('Ext.data.Store', {
    model: 'PopulationPoint',
    data: [{ Actual:700000,Budget:100000,name:'Q1'},
           { Actual:1000000,Budget:1500000 ,name:'Q2'},
           { Actual:900000,Budget:1200000,name:'Q3'},  
           { Actual:500000,Budget:800000,name:'Q4'},     
            ]
  });


var chart = Ext.create('Ext.chart.Chart', {
            
            xtype: 'chart',
            width: 1000,
			height: 450,
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: values,
            legend: {
              position: 'right', 
              //x:180,
            //y:10,
             
            },
           // insetPadding:400,
           axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['Actual', 'Budget'],
                minimum: 0,
                maximun:10000,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                grid: true,
                title: 'Amount'
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            
            series: [{
                type: 'column',
                axis: 'left',
                xField: 'name',
                yField: ['Actual', 'Budget']
                
            }]
        });


Ext.define('MyDesktop.view.budgetmanagement.DualbarForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.dualbarform_budget',
   		id:'dualbarform_budget_ooh',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	//requires:['MyDesktop.store.Kras','MyDesktop.view.kras.KrasGrid','MyDesktop.view.kras.KrasAddEditForm'],
    title:'Budget vs. Actual',
    defaults: {
        
        labelWidth: 90,

    },
    tbar: [{
            text: 'Save Dualbar Chart',
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
}); 


});










