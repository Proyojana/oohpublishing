Ext.define('MyDesktop.view.projectmanagement.newproject.team.newprojectTeamForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectTeamform',
   		id:'newprojectTeamform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.team.TeamGrid','MyDesktop.view.projectmanagement.newproject.team.TeamAddForm'],
	title:'Team',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
	{
			xtype:'newteamgrid',
			x:1,
			y:1,
			height:260
	},
		{
			xtype:'teamaddform',
			x:1,
			y:300,
			height:260
		}
			]
	  
	
		this.callParent();
	}
     
}); 
