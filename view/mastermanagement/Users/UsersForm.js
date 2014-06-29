Ext.define('MyDesktop.view.mastermanagement.Users.UsersForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.usersform',
   		id:'usersform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Users.UsersGrid','MyDesktop.view.mastermanagement.Users.UsersAddForm'],
    title:'Users',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'usersgrid',
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
			xtype:'usersaddform',
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
