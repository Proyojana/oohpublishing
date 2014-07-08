Ext.define('MyDesktop.view.mastermanagement.Services.ServiceForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.serviceform',
   		id:'serviceform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Services.ServiceGrid','MyDesktop.view.mastermanagement.Services.ServiceAddForm'],
    title:'Services',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'servicegrid',
						
		},
		{
			xtype:'serviceaddform',
			x:1,
			y:270,
			height:260
		}
		]
	  	this.callParent();
	}
     
}); 
