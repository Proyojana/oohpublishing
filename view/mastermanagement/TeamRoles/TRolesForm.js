Ext.define('MyDesktop.view.mastermanagement.TeamRoles.TRolesForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.trolesform',
   		id:'trolesform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.TeamRoles.TRolesGrid','MyDesktop.view.mastermanagement.TeamRoles.TRolesAddForm'],
    title:'List Of Roles',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'trolesgrid',
			//xtype:'cityaddform',
						
		},
		/*{
		xtype:'fieldset',
		id:'city_tab',
		plain:true,
		x:0,
		y:260,
		activeTab: 0,
		height:270,
		defaults: {
			bodyStyle:'padding:10px'
		},
		items:[*/
		{
			xtype:'trolesaddform',
			x:1,
			y:270,
			height:260
		}
		
	  	//]
	 //}
			]
	  
	
		this.callParent();
	}
     
}); 
