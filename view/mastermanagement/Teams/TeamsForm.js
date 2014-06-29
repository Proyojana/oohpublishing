Ext.define('MyDesktop.view.mastermanagement.Teams.TeamsForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.teamsform',
   		id:'teamsform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.Teams.TeamsGrid','MyDesktop.view.mastermanagement.Teams.TeamsAddForm'],
    title:'Teams',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'teamsgrid',
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
			xtype:'teamsaddform',
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
