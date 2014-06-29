var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.team.TeamAddForm' ,{
    extend: 'Ext.form.FieldSet',
    alias : 'widget.teamaddform',
   		id:'teamaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	title:'Add Team Members',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	initComponent:function(){
	
		this.items= [
		
		{
			id:'userscode',
			xtype:'combo',
			fieldLabel: 'Project Manager',
			name: 'userscode',
			x:150,
			y:10,
			width:300,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},{
			id:'users name',
			fieldLabel: 'Production Editor',
			name: 'usersname',
			xtype:'combo',
			align:'center',
			x:150,
			y:40,
			width:300,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{  
			id:'usersdescription',
			fieldLabel: 'Copy Editor',
			allowBlank: false,
			afterLabelTextTpl: required,
			xtype:'combo',
			name: 'usersdescription',
			align:'center',
			x:150,
			y:70,
			width:300,
			
    	},
    	{  
			id:'proofreader',
			fieldLabel: 'Proof Reader',
			allowBlank: false,
			afterLabelTextTpl: required,
			xtype:'combo',
			name: 'usersdescription',
			align:'center',
			x:500,
			y:10,
			width:300,
			
    	},
    	{  
			id:'indexer',
			fieldLabel: 'Indexer',
			allowBlank: false,
			afterLabelTextTpl: required,
			xtype:'combo',
			name: 'usersdescription',
			align:'center',
			x:500,
			y:40,
			width:300,
			
    	},
    	{  
			id:'typesetter',
			fieldLabel: 'Typesetter',
			allowBlank: false,
			afterLabelTextTpl: required,
			xtype:'combo',
			name: 'usersdescription',
			align:'center',
			x:500,
			y:70,
			width:300,
			
    	},
    		
		{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	    id:'add_users1',
			x:350,
			y:165,
			width:75,
			handler: function (){				
			
			}
	  	},
		
		{
			xtype: 'button',
		  	text: 'Edit',
		  	iconCls: 'editClass',
		  	id:'edit_users1',
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
		  	iconCls: 'button_reset',
		  	id:'reset_users1',
			x:550,
			y:165,
			width:75,
			handler: function (){
				
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


