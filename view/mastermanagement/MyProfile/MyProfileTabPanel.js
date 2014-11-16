Ext.define('MyDesktop.view.mastermanagement.MyProfile.MyProfileTabPanel',{
		extend:'Ext.tab.Panel',
		id:'myprofiletab',
		alias:'widget.myprofiletab',
		
		requires:['MyDesktop.view.mastermanagement.MyProfile.MyProfileForm'],
					autoDestroy: false,
					deferredRender: true,
                    xtype: 'tabpanel',
					region: 'center',
                  items: [{xtype:'myprofileform'}]
	});