var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.team.TeamAddForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.teamaddform',
   		id:'teamaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	requires:['MyDesktop.store.ProjectManagers','MyDesktop.store.ProductionEditor','MyDesktop.store.Projects'],
	title:'Add Team Members',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	initComponent:function(){
	
		var jobcode = Ext.create('MyDesktop.store.Projects');
		jobcode.load({params:{action: 1}});
		
		var projectmanager = Ext.create('MyDesktop.store.ProjectManagers');
		projectmanager.load({params:{action: 8}});
		
		var productioneditor = Ext.create('MyDesktop.store.ProductionEditor');
		productioneditor.load({params:{action: 9}});
	
		this.items= [
		
		{  
			id:'job_code_team',
			fieldLabel: 'Job Code',
			allowBlank: false,
			afterLabelTextTpl: required,
			xtype:'combo',
			name: 'job_code_team',
			store:jobcode,
			displayField: 'code',
			valueField: 'id',
			align:'center',
			x:150,
			y:10,
			width:300,
			
    	},
		
		{
			id:'project_manager',
			xtype:'combo',
			fieldLabel: 'Project Manager',
			name: 'project_manager',
			x:150,
			y:40,
			width:300,
			allowBlank: false,
			afterLabelTextTpl: required,
			store:projectmanager,
			displayField: 'username',
			valueField: 'userid',
    	},{
			id:'production_editor',
			fieldLabel: 'Production Editor',
			name: 'production_editor',
			xtype:'combo',
			align:'center',
		//	x:150,
			//y:70,
			x:500,
			y:40,
			width:300,
			allowBlank: false,
			afterLabelTextTpl: required,
			store:productioneditor,
			displayField: 'username',
			valueField: 'userid',
			},
				{  
			id:'proofreader',
			fieldLabel: 'Proof Reader',
			allowBlank: false,
			afterLabelTextTpl: required,
		//	xtype:'combo',
			name: 'usersdescription',
			align:'center',
			x:150,
			y:70,
			width:300,
			
    },	
    {  
			id:'indexer',
			fieldLabel: 'Indexer',
			allowBlank: false,
			afterLabelTextTpl: required,
		//	xtype:'combo',
			name: 'usersdescription',
			align:'center',
			x:500,
			y:70,
			width:300,
			
    	},
    	{  
			id:'copy_editor',
			fieldLabel: 'Copy Editor',
			allowBlank: false,
			afterLabelTextTpl: required,
		//	xtype:'combo',
			name: 'usersdescription',
			align:'center',
			x:150,
			y:100,
			width:300,
			
    	},
    
    	
    	{  
			id:'typesetter',
			fieldLabel: 'Typesetter',
			allowBlank: false,
			afterLabelTextTpl: required,
		//	xtype:'combo',
			name: 'usersdescription',
			align:'center',
			x:500,
			y:100,
			width:300,
			
    	},
    		
		{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	    id:'add_job_team',
			x:350,
			y:165,
			width:75,
			handler: function (){				
				
				var currentForm = this.up('teamaddform');
				
				var job_code = Ext.getCmp('job_code_team').getValue();
				var project_manager = Ext.getCmp('project_manager').getValue();
				var production_editor = Ext.getCmp('production_editor').getValue();
				var proofreader = Ext.getCmp('proofreader').getValue();
				var indexer = Ext.getCmp('indexer').getValue();
				
				var copy_editor= Ext.getCmp('copy_editor').getValue();
				var typesetter= Ext.getCmp('typesetter').getValue();
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
				conn.request({
				url: 'service/projects.php',
				method: 'POST',
				params : {action:9,job_code:job_code,project_manager:project_manager,production_editor:production_editor,proofreader:proofreader,indexer:indexer,copy_editor:copy_editor,typesetter:typesetter},
				success:function(response){
				obj = Ext.JSON.decode(response.responseText);
				Ext.Msg.alert('Message', obj.message); 
			//	currentForm.getForm().reset();
			//	Ext.getCmp('usersgrid').getStore().reload();
				}
				});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				}
				}
			
			
	  	},
		
		{
			xtype: 'button',
		  	text: 'Edit',
		  	iconCls: 'editClass',
		  	id:'edit_job_team',
			align:'center',
			x:450,
			y:165,
			width:75,
			handler: function ()
			   {
			  
			}
	  	},
		
	  	{
			xtype: 'button',
		  	text: 'Reset',
		  	iconCls: 'reset_job_team',
		  	id:'reset_users1',
			x:550,
			y:165,
			width:75,
			handler: function (){
				var currentForm = this.up('teamaddform');
				currentForm.getForm().reset();
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


