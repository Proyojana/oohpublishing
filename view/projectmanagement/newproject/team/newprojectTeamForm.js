Ext.define('MyDesktop.view.projectmanagement.newproject.team.newprojectTeamForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectTeamform',
   		id:'newprojectTeamform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.team.TeamGrid','MyDesktop.view.projectmanagement.newproject.team.TeamAddForm','MyDesktop.view.projectmanagement.newproject.team.newprojectTeamHeaderForm'],
	title:'Team',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	
	initComponent:function(){
		
		this.items = [
	{
			xtype:'newprojectTeamHeaderForm',
			x:0,
			y:0
				},
		{
			xtype:'teamaddform',
			x:0,
			y:80,
			height:260
		}
			]
	  
	
		this.callParent();
	}
     
}); 
