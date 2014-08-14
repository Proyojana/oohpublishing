Ext.define('MyDesktop.view.projectmanagement.currentprojects.productionReport_HeaderForm' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.productionReport_HeaderForm',
   		id:'productionReport_HeaderForm',
    margin: '10 10 10 10',
	layout: {
                 type: 'absolute'
            },
	
	frame:true,
    //title:'Current Projects',
    defaults: {
        
        labelWidth: 60,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		var customers = Ext.create('MyDesktop.store.Reports');
               customers.load({params:{action: 2}});
		this.items = [
		{
			fieldLabel:'JOB#',
			id:'productionreport_jobCode',
			readOnly:true,
			
			x:0,
			y:0,
		},
		{
			fieldLabel:'Project Title',
			id:'productionreport_projectTtile',
			readOnly:true,
			 labelWidth: 80,
			x:220,
			y:0
		},
		{
			xtype:'datefield',
			id:'currentdate',
			fieldLabel:'Date',
			 labelWidth: 40,
			 width:150,
			x:450,
			y:0
		},
		{
			fieldLabel:'From',
			id:'productionreport_from',
			readOnly:true,
			x:0,
			y:30
			
		},
		{
			xtype:'combo',
			fieldLabel:'To',
			id:'productionreport_to',
			width:210,
			 labelWidth: 80,
			x:220,
			y:30,
			store:customers,
            typeAhead:true,
            triggerAction:'all',
            displayField:'mail',
		}
		]
	  
	
		this.callParent();
	}
     
}); 


