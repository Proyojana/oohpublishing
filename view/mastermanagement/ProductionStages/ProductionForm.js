
Ext.define('MyDesktop.view.mastermanagement.ProductionStages.ProductionForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.productionform',
   		id:'productionform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.ProductionStages.ProductionGrid','MyDesktop.view.mastermanagement.ProductionStages.ProductionAddForm'],
    title:'Production Stages',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'productiongrid'
		},
		{
			xtype:'Productionaddform',
			x:01,
			y:300
		}
		
	  		]
	  
	
		this.callParent();
	}
     
}); 
