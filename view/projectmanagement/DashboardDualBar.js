Ext.require('Ext.chart.*');
 Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);
Ext.onReady(function() {
    Ext.define('emp', {
        extend: 'Ext.data.Model',
       fields: ['project','Estimated','Actuals']
     //   fields: ['Estimated','Actuals']
        
    });

 /*var store1 = Ext.create('Ext.data.JsonStore', {
    fields: ['project','Estimated','Actual','Exists'],
    data: [
    { 'project': 'Project A','Estimated': 580,'Actual': 680,'Exists': 400},
    { 'project': 'Project B','Estimated': 540,'Actual': 450,'Exists': 350},
    { 'project': 'Project C','Estimated': 680,'Actual': 400,'Exists': 400},
    ]
});*/

var store1 = Ext.create('Ext.data.JsonStore', {
    model: 'emp',
    autoLoad:true,   
      proxy: {
    		type:'ajax',
			url: 'service/ProjectChart.php',
			
			actionMethods: {
		     read: 'POST'
    		},
    		extraParams:{action:1},
    		reader: {
				type:'json',
	        	root: 'results',
    		}
		}
  });
 
 var barchart = Ext.create('Ext.chart.Chart', {
    renderTo: Ext.getBody(),
    width: 510,
    height: 450,
    x:20,
    y:60,
    store: store1,
    legend: true,
    axes: [
        {
           type: 'Numeric',
            position: 'left',
            fields:  ['Estimated','Actuals'],
            title: 'Cost',
			minimum:0,
			//maximum:1200,
			grid:true,
			label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
        },
        {
            type: 'Category',
            position: 'bottom',
            fields: 'project',            
            title: 'Projects',
        }
    ],
    series: [{
        type: 'column',
        axis: 'left',
        xField: 'project',
        yField: ['Estimated','Actuals'],       
		style:{
			width:'30',
		},		
		label: {
                  display: 'insideEnd',
                  'text-anchor': 'middle',
                    field: ['Estimated','Actuals'],
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'vertical',
                    color: '#333'
                },
    }]
});

var dualbarobject =  Ext.getCmp('dashboarddualbar');

if(!dualbarobject){
	Ext.define('MyDesktop.view.projectmanagement.DashboardDualBar' ,{
		extend: 'Ext.form.FieldSet',
		alias : 'widget.dashboarddualbar',
   		id:'dashboarddualbar',
   		width:530,
   		//y:60,
   		title:'Budget Vs Actual',
 //   margin: '10 10 10 10',   
		defaults: {        
			labelWidth: 90,
		},
		items:[barchart]
	}); 
}
});