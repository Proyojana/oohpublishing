 Ext.require('Ext.chart.*');
 Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox','Ext.Toolbar']);
 

 var chartBox = Ext.create('Ext.chart.Chart', {
	 width: 700,
    height: 550,
	id:'chartBox',
	//style: 'background:#fff',
	animate: true,
	store: Ext.data.Store({
		fields: ['name','Actual','Budget'],
		data: [{
			'name': 'Jan 2013',
			'Actual':7,
			'Budget':3
		},{
			'name': 'Feb 2013',
			'Actual':13,
			'Budget':15
		},{
			'name': 'Mar 2013',
			'Actual':23,
			'Budget':16
		},{
			'name': 'Apr 2013',
			'Actual':18,
			'Budget':9
			
		},{
			'name': 'May 2013',
			'Actual':25,
			'Budget':17
		},
		{
			'name': 'Jun 2013',
			'Actual':55,
			'Budget':17
		},
		{
			'name': 'Jul 2013',
			'Actual':25,
			'Budget':10
		},
		{
			'name': 'Aug 2013',
			'Actual':35,
			'Budget':07
		},
		
		]
	}),
	theme: 'Category1',
	legend: {
		position: 'right'
	},
	axes: [{
		type: 'Numeric',
		position: 'left',
		fields: ['Actual','Budget'],
		label: {
			renderer: Ext.util.Format.numberRenderer('0,0')
		},
		title: 'Expenses Request',
		grid: true,
		minimum: 0
	},{
		type: 'Category',
		position: 'bottom',
		fields: ['name'],
		title: 'Month and Year'
	}],
	series: [
	{
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
                xField: 'name',
                yField: 'Budget',
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            },
            {
                type: 'line',
                highlight: {
                    size: 7,
                    radius: 7
                },
                axis: 'left',
                smooth: true,
               // fill: true,
                xField: 'name',
                yField: 'Actual',
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0
                }
            }]
});
Ext.define('MyDesktop.view.budgetmanagement.DashboardBuget' , {
	extend: 'Ext.form.Panel',
	alias : 'widget.budgetdashboard',
	id:'budgetdashboard',
	layout: {
		type: 'absolute'
	},

	frame:true,

	title:'Bell Curve',
	defaults: {

		labelWidth: 90,

	},
	/*tbar: [{
            text: 'Save Chart',
            pressed: true,
            handler: function() {
                Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
                    if(choice == 'yes'){
                        chartBox.save({
                            type: 'image/png'
                        });
                    }
                });
            }
       },
       
        ],*/
        
        
 items:chartBox,
	

});











