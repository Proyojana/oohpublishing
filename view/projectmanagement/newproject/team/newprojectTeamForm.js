Ext.define('MyDesktop.view.projectmanagement.newproject.team.newprojectTeamForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectTeamform',
   		id:'newprojectTeamform',
    margin: '10 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.team.TeamGrid','MyDesktop.view.projectmanagement.newproject.team.newprojectTeamHeaderForm'],
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
			xtype:'newteamgrid',
			x:0,
			y:100,
			height:290
		},
		
		{
				xtype:'button',
				text:'Save + Next',
				pressed:true,
				width:100,
				x:450,
				y:410,
				handler:function(){
					var project_id=Ext.getCmp('teamHeader_projectID').getValue(); 
					//var project_id=90;
					var job_code=Ext.getCmp('teamHeader_Job').getValue(); 
					var role='';
					var name='';
					var email='';
					var myStore = Ext.getCmp('newteamgrid').getStore();
					myStore.each(function(rec) {
						role=role+rec.get('role')+',';
						name=name+rec.get('name')+',';
						email=email+rec.get('email')+',';
						});
						
					var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/Users.php',
						method: 'POST',
						params : {action:11,project_id:project_id,role:role,name:name,email:email},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);
							//Ext.getCmp('newprojectnotesformTab').setDisabled(false);
							
						}
					});
					var currentHeaderForm = Ext.getCmp('newprojectNotesHeaderForm');
                	 //load data in header form
                	
						
						currentHeaderForm.getForm().load({
   								 url: 'service/notes.php',
							     params: {
        						 	action:5,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
					Ext.getCmp('newprojectnotesformTab').setDisabled(false);
						Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectnotesformTab');
				}
			}
			]
	  
	
		this.callParent();
	}
     
}); 
