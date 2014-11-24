var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
var require_one = '<span style="color:blue;font-weight:bold" data-qtip="Required">*</span>';
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
					{"format":"247 x 74"},
					{"format":"247 x 174"},
					{"format":"228 x 152"},
					{"format":"246 x 174"},
					{"format":"247 x 74"},

        ]
    });
    var cover = Ext.create('Ext.data.Store', {
        fields: ['type'],
        data : [
           {"type":"Gloss"},
            {"type":"Matt"}
        ]
    });
   var note = Ext.create('Ext.data.Store', {
        fields: ['note'],
        data : [
           {"note":"Foot Notes"},
            {"note":"Book endfoot"}
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
	autoScroll:true,
	height:245,
	requires:['MyDesktop.store.Customers','MyDesktop.store.Workflow','MyDesktop.store.Customers_team'],
  
    defaults: {
        labelWidth: 150,
    },
  //  defaultType: 'textfield',
    listeners: {
     	 afterrender: function(){
     	 //	alert("listen");
     	 	autoReload();
     	    Ext.getCmp('newprojectauthorformTab').setDisabled(true);
			Ext.getCmp('newprojectbudgetformTab').setDisabled(true);
			Ext.getCmp('newprojectscheduleformTab').setDisabled(true);
			Ext.getCmp('newprojectteamformTab').setDisabled(true);
			Ext.getCmp('newprojectnotesformTab').setDisabled(true);
			Ext.getCmp('newprojectartworkformTab').setDisabled(true);
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
				xtype:'textfield',
			id:'add_project_id',
			name: 'add_project_id',
			hidden:true
			},
		{
			xtype:'textfield',
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
    		xtype:'textfield',
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
			width:320,0000
			allowBlank: false,
			afterLabelTextTpl: required,
    	},*/
    	{
    		xtype:'textfield',
			id:'hb_isbn',
			fieldLabel: 'HB ISBN',
			maxLength: 13, // for validation
            enforceMaxLength :13,
            x:10,
			y:40,
			width:320,
			afterLabelTextTpl: require_one,
			
    	},
    	{
    		xtype:'textfield',
			id:'pb_isbn',
			fieldLabel: 'PB ISBN',
			maxLength: 13, // for validation
            enforceMaxLength :13,
			name: 'PB ISBN',
			align:'center',
			x:360,
			y:40,
			width:320,
			afterLabelTextTpl: require_one,
			
			},
			{
    		xtype:'textfield',
			id:'ebook_isbn',
			fieldLabel: 'ebook ISBN',
			maxLength: 13, // for validation
            enforceMaxLength :13,
			name: 'ebook ISBN',
			align:'center',
			x:710,
			y:40,
			width:320,
			//afterLabelTextTpl: require_one,
			
			},
    	{
    	    xtype:'textfield',
    		id:'project_series',
			fieldLabel: 'Series',
			x:10,
			y:70,
			width:320,
			//allowBlank: false,
			//afterLabelTextTpl: required,
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
    		xtype:'textfield',
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
			//allowBlank: false,
			//afterLabelTextTpl: required,
			xtype:'numberfield',
			hideTrigger:true,
			
			minValue: 0,
			step: 2,
            value: 0,
            listeners: {
      'blur': function(t, ev, b)
{
// Ext.getBody().mask("Modifying Instance...");
// $.get("updateInstances/"+)
var value=t.lastValue;

var sum= value%2;

if(sum==0)
{

t.setValue(value);
}
else
{
var value1=value+1;
t.setValue(value1);
}

},
       }
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
			step: 2,
value: 0,

// Add change handler to force user-entered numbers to evens
listeners: {
      'blur': function(t, ev, b)
{
// Ext.getBody().mask("Modifying Instance...");
// $.get("updateInstances/"+)
var value=t.lastValue;

var sum= value%2;

if(sum==0)
{

t.setValue(value);
}
else
{
var value1=value+1;
t.setValue(value1);
}

},
}
			//allowBlank: false,
			//afterLabelTextTpl: required,
    	},
    	
    	{
    		xtype:'datefield',
    		format: 'd/m/y',
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
    		format: 'd/m/y',
    		id:'agreed_deadline',
			fieldLabel: 'Agreed deadline',
			x:360,
			y:130,
			width:320,
			//allowBlank: false,
			//afterLabelTextTpl: required,
    	},
    	
    	{
			fieldLabel:'Project Start Date',
			id:'projectStartDate',
			xtype:'datefield',
			x:720,
			y:130,
			width:260,	
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
			//allowBlank: false,
			//afterLabelTextTpl: required,
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
			//allowBlank: false,
			//afterLabelTextTpl: required,
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
			fieldLabel: 'Expected Index extent',
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
    	},
    	{
    		xtype:'combo',
			id:'project_note',
			fieldLabel: 'Notes',
			multiselect:true,
			x:700,
			y:30,
			width:320,
			height:56,
			store:note,
			displayField: 'note',
			valueField: 'note',
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
			//allowBlank: false,
			//afterLabelTextTpl: required,
		
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
        // Fieldset in Column 1 - collapsible via toggle button
       xtype:'fieldset',
        layout: 'hbox',
        title: 'Author/Editor Details',
             x:0,
			y:420,
			layout:'absolute',
			 defaults: {
        labelWidth: 150,
    },
			height:70,
        items :[
    	{
    		xtype:'textfield',
			id:'author_create',
			fieldLabel: 'Author/Editor',
			align:'center',
			x:0,
			y:0,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			readOnly: true,
			value:'Main Contact',
			hidden:true
			},
    	{
    		xtype:'textfield',
			id:'author_name',
			fieldLabel: 'Author Name',
			align:'center',
			x:0,
			y:0,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
			{
    		xtype:'textfield',
			id:'author_email',
			fieldLabel: 'Email',
			align:'center',
			x:350,
			y:0,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			vtype: 'email',
			},
    	
		
    	]
    },
		{
			xtype:'button',
    	    text:'Save + Next',
    	    iconCls: 'button_add',
    	    id:'add_team',
			x:450,
			y:540,
			width:110,
			handler: function (){			
				//Ext.getCmp('newprojectauthorformTab').setDisabled(false);	
				var currentForm = this.up('newprojectaddform');
				var job_code = Ext.getCmp('job_code').getValue();
				var project_title = Ext.getCmp('project_title').getValue();
				//var project_author= Ext.getCmp('project_author').getValue();
				var hb_isbn= Ext.getCmp('hb_isbn').getValue();
				var pb_isbn= Ext.getCmp('pb_isbn').getValue();
				var ebook_isbn= Ext.getCmp('ebook_isbn').getValue();
				
				var project_series = Ext.getCmp('project_series').getValue();
				var project_format = Ext.getCmp('project_format').getValue();
				var project_design= Ext.getCmp('project_design').getValue();
				var castoff_extent= Ext.getCmp('castoff_extent').getValue();
				var confirmed_extent= Ext.getCmp('confirmed_extent').getValue();
				
				var client_deadline = Ext.getCmp('client_deadline').getValue();
				var agreed_deadline = Ext.getCmp('agreed_deadline').getValue();
				var project_start_date = Ext.getCmp('projectStartDate').getValue();
				
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
				var project_note= Ext.getCmp('project_note').getValue();
				
				var print_run_confirmed= Ext.getCmp('print_run_confirmed').getValue();
				
				//Author Details
				var author_create= Ext.getCmp('author_create').getValue();
				var author_name= Ext.getCmp('author_name').getValue();
				var author_email= Ext.getCmp('author_email').getValue();
				
				if(currentForm.getForm().isValid() == true)
				{
					if(hb_isbn!='' || pb_isbn!='')
					{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/projects.php',
						method: 'POST',
						params : {action:5,job_code:job_code,project_title:project_title,/*project_author:project_author,*/hb_isbn:hb_isbn,pb_isbn:pb_isbn,project_series:project_series,
							project_format:project_format,project_design:project_design,castoff_extent:castoff_extent,confirmed_extent:confirmed_extent,client_deadline:client_deadline,
							agreed_deadline:agreed_deadline,project_start_date:project_start_date,word_count:word_count,manuscript:manuscript,index_extent:index_extent,chapter_footer:chapter_footer,
							contain_colour:contain_colour,project_client:project_client,project_team:project_team,project_workflow:project_workflow,word_count_indexing:word_count_indexing,
							cover_type:cover_type,print_run:print_run,print_run_confirmed:print_run_confirmed,project_note:project_note,ebook_isbn:ebook_isbn},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							
					Ext.getCmp('newprojectauthorformTab').setDisabled(false);	
					Ext.getCmp('newprojectbudgetformTab').setDisabled(false);
					Ext.getCmp('newprojectscheduleformTab').setDisabled(false);	
					Ext.getCmp('newprojectteamformTab').setDisabled(false);
					Ext.getCmp('newprojectnotesformTab').setDisabled(false);
					Ext.getCmp('newprojectartworkformTab').setDisabled(false);
                	 /****load data in Author header form*****/
                	var currentHeaderForm = Ext.getCmp('newprojectAuthorHeaderForm');
						currentHeaderForm.getForm().load({
   								 url: 'service/Author.php',
							     params: {
        						 	action:8,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
						 /****load data in Budget header form*****/
					var currentForm = Ext.getCmp('newprojectBudgetHeaderForm');
                	currentForm.getForm().load({
   								 url: 'service/budget.php',
							     params: {
        						 	action:2,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
					var grid3=Ext.getCmp('accountPayableGrid');
									grid3.getStore().load({params:{action:1,job_code:job_code}});
					var grid4=Ext.getCmp('accountReceiveGrid_a');
									grid4.getStore().load({params:{action:10,job_code:job_code}});
					var grid3=Ext.getCmp('new_author_grid');
									grid3.getStore().load({params:{action:2,job_code:job_code}});
						/***load data in Schedule header form*****/
						var workflow_id= Ext.getCmp('project_workflow').getValue();
						var currentHeaderForm = Ext.getCmp('newprojectScheduleHeaderForm');
                	 currentHeaderForm.getForm().load({
   								 url: 'service/schedule.php',
							     params: {
        						 	action:1,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   	});
					var grid3=Ext.getCmp('newprojectSchedulegrid');
			        grid3.getStore().load({params:{action:2,workflowid:workflow_id}});
					/****load data in Team header form*****/			
						var currentHeaderForm = Ext.getCmp('newprojectTeamHeaderForm');
							currentHeaderForm.getForm().load({
								url: 'service/projects.php',
								params: {
									action:16,
									job_code:job_code
								},
								
							});
					//load data in Notes header form
                       	var currentHeaderForm = Ext.getCmp('newprojectNotesHeaderForm');
                	    currentHeaderForm.getForm().load({
   								 url: 'service/notes.php',
							     params: {
        						 	action:5,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						//load data in Artwork header form
					 var currentHeaderForm = Ext.getCmp('createprojectArtworkHeaderForm');
							currentHeaderForm.getForm().load({
								url: 'service/Artwork.php',
								params: {
									action:5,
									job_code:job_code
								},
								
							});
					
					Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectauthorformTab');
						
					
										
						}
					});
					
					
					
						var author_id='';
					var author_phone='';
					var author_see_proof='';
					var author_no_proof='';
					var author_address='';
					
					var conn = new Ext.data.Connection();
					
					conn.request({
						url: 'service/Author.php',
						method: 'POST',
						params : {action:1,id:author_id,job_code:job_code,author:author_create,name:author_name,address:author_address,email:author_email,phone:author_phone,see_proof:author_see_proof,no_proof:author_no_proof},
						success:function(response){
						obj = Ext.JSON.decode(response.responseText);
						Ext.Msg.alert('Message', obj.message);
					}
					});
					


					
					}
					else{
						Ext.MessageBox.alert('Please fill HB ISBN or PB ISBN.');
					}
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
			x:600,
			y:540,
			width:110,
			handler: function (){
				var currentForm = this.up('newprojectaddform');
				currentForm.getForm().reset();
				autoReload();
			Ext.getCmp('newprojectauthorformTab').setDisabled(true);
			Ext.getCmp('newprojectbudgetformTab').setDisabled(true);
			Ext.getCmp('newprojectscheduleformTab').setDisabled(true);
			Ext.getCmp('newprojectteamformTab').setDisabled(true);
			Ext.getCmp('newprojectnotesformTab').setDisabled(true);
			Ext.getCmp('newprojectartworkformTab').setDisabled(true);
			}
	  	},
	  	{
xtype:'label',
text:'Note:',

x:10,
y:500,
},
{

html:'<span style="background-color:#dfe8f5; color:red;font-weight:bold">*</span>',
border:false,
x:10,
y:520,
width:8,

},
{
xtype:'label',
text:'Mandatory fields',
x:20,
y:520,

},
{
html:'<span style="background-color:#dfe8f5; color:blue;font-weight:bold">*</span>',
border:false,
x:10,
y:545,
width:8,
},
{
xtype:'label',
text:'Both are not mandatory but should fill one atleast.',
x:20,
y:545,

}]
	  
	
		
	this.callParent();
	}
     
}); 


