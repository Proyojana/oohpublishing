var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
function autoReload()
{
	var currentForm = Ext.getCmp('newprojectaddform');   
			 currentForm.getForm().load({
   								 url: 'service/projects.php',
							     params: {
        						 	action:7
        						 	
							    },
							    success:function(form,action){
							    	
							    	alert("success");
							    	alert(action.result.message);
							    },
							    failure:function(form,action){	
							    //	alert("failure");						    
							    	Ext.getCmp('job_code').setValue(action.result.message);
							    }
							
							});
};
var times = Ext.create('Ext.data.Store', {
        fields: ['format'],
        data : [
           {"format":"216 x 138"},
            {"format":"226 x 52"},
            {"format":"234 x 156"},
            {"format":"246 x 189"},
            {"format":"247 x 74"}
        ]
    });
    var cover = Ext.create('Ext.data.Store', {
        fields: ['type'],
        data : [
           {"type":"Gloss"},
            {"type":"Matt"}
        ]
    });
Ext.define('MyDesktop.view.projectmanagement.newproject.NewProjectAddForm' ,{
    extend: 'Ext.form.Panel',
    title:'Create New Project',
    alias : 'widget.newprojectaddform',
   		id:'newprojectaddform',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	requires:['MyDesktop.store.Customers','MyDesktop.store.Workflow','MyDesktop.store.Customers_team'],
  
    defaults: {
        labelWidth: 150,
    },
    defaultType: 'textfield',
    listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	 	autoReload();
     	 	Ext.getCmp('newprojectauthorformTab').setDisabled(true);
			Ext.getCmp('newprojectbudgetformTab').setDisabled(true);
			Ext.getCmp('newprojectscheduleformTab').setDisabled(true);
			Ext.getCmp('newprojectteamformTab').setDisabled(true);
     	}},
     	
	initComponent:function(){
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
	   	var client = Ext.create('MyDesktop.store.Customers');
		client.load({params:{action: 1}});
		 var team = Ext.create('MyDesktop.store.Customers_team');
		var workflow = Ext.create('MyDesktop.store.Workflow');
		workflow.load({params:{action: 1}});
		
		this.items= [
		
			{
			id:'add_project_id',
			name: 'add_project_id',
			hidden:true
			},
			
		{
			id:'job_code',
			fieldLabel: 'Job #',
			x:10,
			y:10,
			width:320,
			allowBlank: false,
			readOnly:true,
			afterLabelTextTpl: required,
    	},
    	{
			id:'project_title',
			fieldLabel: 'Title',
			align:'center',
			x:360,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	/*{
    		
    		id:'project_author',
			fieldLabel: 'Author',
			x:710,
			y:10,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},*/
    	{
			id:'hb_isbn',
			fieldLabel: 'HB ISBN',
			x:10,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
			id:'pb_isbn',
			fieldLabel: 'PB ISBN',
			name: 'PB ISBN',
			align:'center',
			x:360,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    	
    		id:'project_series',
			fieldLabel: 'Series',
			x:10,
			y:70,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
    		xtype:'combo',
			id:'project_format',
			fieldLabel: 'Format',
			x:360,
			y:70,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			store:times,
			displayField:'format'
    	},
    	{
			id:'project_design',
			fieldLabel: 'Design',
			align:'center',
			x:710,
			y:70,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    		
    		id:'castoff_extent',
			fieldLabel: 'Cast-off extent',
			x:10,
			y:100,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			xtype:'numberfield',
			hideTrigger:true,
			minValue: 0,
    	},
    	{
    		xtype:'numberfield',
    		hideTrigger:true,
    		minValue: 0,
			id:'confirmed_extent',
			fieldLabel: 'Confirmed extent',
			x:360,
			y:100,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
    		xtype:'datefield',
			id:'client_deadline',
			fieldLabel: 'Client deadline',
			align:'center',
			x:10,
			y:130,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	{
    		xtype:'datefield',
    		id:'agreed_deadline',
			fieldLabel: 'Agreed deadline',
			x:360,
			y:130,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
        // Fieldset in Column 1 - collapsible via toggle button
       xtype:'fieldset',
        layout: 'hbox',
        title: 'For Indexing',
             x:0,
			y:160,
			layout:'absolute',
			 defaults: {
        labelWidth: 150,
    },
			height:95,
        items :[{
    		xtype:'numberfield',
    		minValue: 0,
    		hideTrigger:true,
    		id:'word_count',
			fieldLabel: 'Word count',
			x:0,
			y:0,
			width:320,
			//labelWidth:140,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	{
    		xtype:'numberfield',
    		minValue: 0,
    		hideTrigger:true,
    		id:'word_count_indexing',
			fieldLabel: 'Word count for indexing',
			x:350,
			y:0,
			width:320,
			//labelWidth:140,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	
		{  
			xtype:'numberfield',
			hideTrigger:true,
			id:'manuscript',
			//margin:'0 0 0 28',
			minValue: 0,
			fieldLabel: 'Manuscript pages',
			align:'center',
			x:700,
			y:0,
			//labelWidth:140,
			width:320,
    	},
    	{  
    		xtype:'numberfield',
    		hideTrigger:true,
    		allowNegative : false,
    		minValue: 0,
    		//margin:'0 0 0 36',
			id:'index_extent',
			fieldLabel: 'Expect Index extent',
			align:'center',
			x:0,
			width:320,
			y:30,
		
    	},]
    },
        	{
        // Fieldset in Column 1 - collapsible via toggle button
       xtype:'fieldset',
        layout: 'hbox',
        title: 'Print details',
             x:0,
			y:265,
			layout:'absolute',
			 defaults: {
        labelWidth: 150,
    },
			height:105,
        items :[
        {  
    		xtype: 'checkboxfield',
			id:'chapter_footer',
			fieldLabel: 'Chapter footer required',
			align:'center',
			x:00,
			y:0,
			width:320,
    	},
    	
        {  
    		xtype: 'checkboxfield',
			id:'contain_colour',
			fieldLabel: 'Contains colour',
			align:'center',
			x:350,
			y:0,
			width:320,
		
    	},
    	{
    		xtype:'combo',
    		id:'cover_type',
			fieldLabel: 'Cover type',
			x:700,
			y:0,
			width:320,
			store:cover,
			displayField:'type',
			//labelWidth:140,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},
    	
		{  
			xtype:'numberfield',
			hideTrigger:true,
			id:'print_run',
			minValue: 0,
			fieldLabel: 'Print run',
			align:'center',
			x:0,
			y:30,
			width:320,
    	},
    	{
    		xtype: 'checkboxfield',
			id:'print_run_confirmed',
			//fieldLabel: 'Chapter footer required',
			//align:'center',
			x:350,
			y:30,
			width:20,
    		
    	},
    	{
    		xtype:'label',
    		text:'Print run confirmed?',
    		x:370,
			y:30,
			width:320,
    		
    	}
    	]
    },
   
    	
    	{  
    		xtype:'combo',
			id:'project_client',
			fieldLabel: 'Client',
			align:'center',
			x:10,
			y:390,
			width:320,
			store:client,
			displayField: 'name',
			valueField: 'id',
			allowBlank: false,
			afterLabelTextTpl: required,
			listeners : {
				change : function() {
					//var currentForm = this.up('newprojectaddform');
					var clientId = Ext.getCmp('project_client').getValue();
					team.load({params:{action:6,clientId:clientId}}); 
					workflow.load({params:{action:8,clientId:clientId}}); 
				}
			}
    	},
    	{   
    		xtype:'combo',
			id:'project_team',
			fieldLabel: 'Client Team',
			align:'center',
			x:360,
			y:390,
			width:320,
			store:team,
			displayField: 'name',
			valueField: 'id',
			queryMode: 'local',
			triggerAction: 'all',
			allowBlank: false,
			afterLabelTextTpl: required,
		
    	},
    	{   
    		xtype:'combo',
			id:'project_workflow',
			fieldLabel: 'Workflow',
			align:'center',
			x:710,
			y:390,
			width:320,
			store:workflow,
			displayField: 'workflow_name',
			valueField: 'workflow_id',
			queryMode: 'local',
			allowBlank: false,
			afterLabelTextTpl: required,
			listeners : {
			change : function() {
			//var currentForm = this.up('newprojectaddform');
			var workflowid = Ext.getCmp('project_workflow').getValue();
		//	alert(workflowid);
			
			//team.load({params:{action:6,project_workflow:project_workflow}});
			//workflow.load({params:{action:8,clientId:clientId}});
			
			var grid3=Ext.getCmp('newprojectSchedulegrid');
			grid3.getStore().load({params:{action:2,workflowid:workflowid}});
			}
			}

    	},
    	
    	
    		
		{
			xtype:'button',
    	    text:'Save + Next',
    	    iconCls: 'button_add',
    	    id:'add_team',
			x:450,
			y:480,
			width:75,
			handler: function (){			
				//Ext.getCmp('newprojectauthorformTab').setDisabled(false);	
				var currentForm = this.up('newprojectaddform');
				var job_code = Ext.getCmp('job_code').getValue();
				var project_title = Ext.getCmp('project_title').getValue();
				//var project_author= Ext.getCmp('project_author').getValue();
				var hb_isbn= Ext.getCmp('hb_isbn').getValue();
				var pb_isbn= Ext.getCmp('pb_isbn').getValue();
				
				var project_series = Ext.getCmp('project_series').getValue();
				var project_format = Ext.getCmp('project_format').getValue();
				var project_design= Ext.getCmp('project_design').getValue();
				var castoff_extent= Ext.getCmp('castoff_extent').getValue();
				var confirmed_extent= Ext.getCmp('confirmed_extent').getValue();
				
				var client_deadline = Ext.getCmp('client_deadline').getValue();
				var agreed_deadline = Ext.getCmp('agreed_deadline').getValue();
				var word_count= Ext.getCmp('word_count').getValue();
				var manuscript= Ext.getCmp('manuscript').getValue();
				var index_extent= Ext.getCmp('index_extent').getValue();
				
				var chapter_footer = Ext.getCmp('chapter_footer').getValue();
				var contain_colour = Ext.getCmp('contain_colour').getValue();
				var project_client= Ext.getCmp('project_client').getValue();
				var project_team= Ext.getCmp('project_team').getValue();
				var project_workflow= Ext.getCmp('project_workflow').getValue();
				
				var word_count_indexing = Ext.getCmp('word_count_indexing').getValue();
				var cover_type= Ext.getCmp('cover_type').getValue();
				var print_run= Ext.getCmp('print_run').getValue();
				var print_run_confirmed= Ext.getCmp('print_run_confirmed').getValue();
				
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/projects.php',
						method: 'POST',
						params : {action:5,job_code:job_code,project_title:project_title,/*project_author:project_author,*/hb_isbn:hb_isbn,pb_isbn:pb_isbn,project_series:project_series,
							project_format:project_format,project_design:project_design,castoff_extent:castoff_extent,confirmed_extent:confirmed_extent,client_deadline:client_deadline,
							agreed_deadline:agreed_deadline,word_count:word_count,manuscript:manuscript,index_extent:index_extent,chapter_footer:chapter_footer,
							contain_colour:contain_colour,project_client:project_client,project_team:project_team,project_workflow:project_workflow,word_count_indexing:word_count_indexing,cover_type:cover_type,print_run:print_run,print_run_confirmed:print_run_confirmed},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							var currentHeaderForm = Ext.getCmp('newprojectAuthorHeaderForm');
                	 /****load data in header form*****/
                	
						
						currentHeaderForm.getForm().load({
   								 url: 'service/Author.php',
							     params: {
        						 	action:8,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
							Ext.getCmp('newprojectauthorformTab').setDisabled(false);	
					Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectauthorformTab');
						//	currentForm.getForm().reset();
						///	Ext.getCmp('citygrid').getStore().reload();
						//	Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
				//autoReload();
					
			}
	  	},
		
		
	  	{
			xtype: 'button',
		  	text: 'Reset',
		  	iconCls: 'button_reset',
		  	id:'reset_team',
			x:550,
			y:480,
			width:75,
			handler: function (){
				var currentForm = this.up('newprojectaddform');
				currentForm.getForm().reset();
				autoReload();
				Ext.getCmp('newprojectauthorformTab').setDisabled(true);
			Ext.getCmp('newprojectbudgetformTab').setDisabled(true);
			Ext.getCmp('newprojectscheduleformTab').setDisabled(true);
			Ext.getCmp('newprojectteamformTab').setDisabled(true);
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


