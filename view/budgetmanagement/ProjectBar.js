Ext.require('Ext.chart.*');
 Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);
 
Ext.onReady(function() {
 
 var store = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data1'],
    data: [
    { 'name': 'Jan',   'data1': 10},
    { 'name': 'Feb',   'data1': 30},
    { 'name': 'Mar',   'data1': 3},
    { 'name': 'Apr',   'data1': 27},
    { 'name': 'May',   'data1': 40},
    { 'name': 'Jun',   'data1': 10},
    { 'name': 'Jul',   'data1': 25},
     { 'name': 'Aug',   'data1': 05},
      { 'name': 'Sep',   'data1': 65},
       { 'name': 'Oct',   'data1': 21},
    
    ]
});
 
var chart = Ext.create('Ext.chart.Chart', {
    renderTo: Ext.getBody(),
    
    width: 700,
    height: 550,
    store: store,

    //legend: true,
    axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields:  'data1',
            title: 'Project-wise Budgets ',
			minimum:0,
        },
        {
            type: 'Category',
            position: 'bottom',
            fields: 'name',            
            title: 'Month',
 
        }
    ],
    series: [{
        type: 'column',
        axis: 'left',
        xField: 'name',
        yField: 'data1',        
		style:{
			width:'100',
		},
		 label: {
		 	display: 'insideEnd',
                  'text-anchor': 'middle',
            field:'data1',
             color: '#333',
            renderer: Ext.util.Format.numberRenderer('0'),
        },
         renderer: function(sprite, record, attr, index, store) {
                    var fieldValue = Math.random() * 20 + 5;
                    var value = (record.get('data1') >> 0) % 4;
                    var color = ['rgb(192,192,192)', 
                                 'rgb(255,130,171)', 
                                 'rgb(123,104,238)', 
                                 'rgb(49, 149, 0)', 
                                 'rgb(249, 153, 0)',
                                 ][value];
                    return Ext.apply(attr, {
                        fill: color
                    });
                   }
 
    }]
});


Ext.define('MyDesktop.view.budgetmanagement.ProjectBar' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.projbar',
   		id:'projbar',
   
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	//requires:['MyDesktop.store.Kras','MyDesktop.view.kras.KrasGrid','MyDesktop.view.kras.KrasAddEditForm'],
    //title:'Project and Budgets Status',
    defaults: {
        
        labelWidth: 90,

    },
    /*tbar: [{
            text: 'Save Status Chart',
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
        ],*/

   // defaultType: 'textfield',
	
	items:chart
}); 

});
