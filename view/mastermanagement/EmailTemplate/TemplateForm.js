Ext.define('MyDesktop.view.mastermanagement.EmailTemplate.TemplateForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.templateform',
   		id:'templateform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.EmailTemplate.TemplateGrid','MyDesktop.view.mastermanagement.EmailTemplate.TemplateAddForm'],
    title:'List Of Templates',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'templategrid',
						
		},
		{
			xtype:'templateaddform',
			x:1,
			y:270,
			height:260
		}
		]
	  	this.callParent();
	}
     
}); 
