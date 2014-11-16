Ext.define('MyDesktop.view.mastermanagement.MyProfile.MyProfileForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.myprofileform',
   		id:'myprofileform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.mastermanagement.MyProfile.MyprofileAddForm'],
    title:'Users',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
		{
			xtype:'myprofileaddform',
									
		},
		
		
		
	
			]
	  
	
		this.callParent();
	}
     
}); 
