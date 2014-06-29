Ext.define('MyDesktop.view.projectmanagement.currentprojects.productionreport' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.productionreport', 
   		id:'productionreport',
   // margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	//frame:true,
	//require:['MyDesktop.view.projectmanagement.production1'],
	
    //autoHeight:true,
  //autoScroll:true,
	
    defaults: {
        
        labelWidth: 200,

    },

    defaultType: 'textfield',
	
	initComponent:function(){     
             
    
		this.items  = [		
		
		{
			xtype:'label',
			text:'Current Status',
			x:05,
			y:10,
			style:
                {
                    'font-weight':'bold',

                }
		},
		{
			xtype:'box',
			fieldLabel:'current text',
			text:'Current',
			id: 'myId6',
			html: '',
		//	 margin:'0 5 0 590',
			x:2,
			y:31,
			width:350,
			height:230,
			autoScroll:true,
			style: {
         border: "1px solid #000000",
  },
  },
		{
			xtype:'label',
			text:'On Schedule',
			x:220,
			y:10,
			style:
                {
                    'font-weight':'bold',

                }
		},
		{
			xtype:'label',
			text:'OOH job#',
			x:500,
			y:10,
			style:
                {
                    'font-weight':'bold',

                }
		},
		{
			xtype:'label',
			text:'Title:',
			x:05,
			y:40,
			style:
                {
                    'font-weight':'bold',
                    color: 'blue'

                }
		}		,
		{
			xtype:'label',
			text:'XYZ book',
			x:250,
			y:40
		},	
		{
			xtype:'label',
			text:'Author:',
			x:05,
			y:60,
			
		},
		{
			xtype:'label',
			text:'0',
			x:250,
			y:60			
		},	
		{
			xtype:'label',
			text:'Hb ISBN:',
			x:05,
			y:80,
			
		},
		{
			xtype:'label',
			text:'0',
			x:250,
			y:80			
		},	
		{
			xtype:'label',
			text:'PB ISBN:',
			x:05,
			y:100,
			
		},
		{
			xtype:'label',
			text:'0',
			x:250,
			y:100			
		},	
		{
			xtype:'label',
			text:'Format:',
			x:05,
			y:120,
			
		},
		{
			xtype:'label',
			text:'0',
			x:250,
			y:120			
		},	
		{
			xtype:'label',
			text:'Design:',
			x:05,
			y:140,
			
		},
		{
			xtype:'label',
			text:'0',
			x:250,
			y:140			
		},	
		{
			xtype:'label',
			text:'Cost-off extent:',
			x:05,
			y:160,
			
		},
		{
			xtype:'label',
			text:'0',
			x:250,
			y:160			
		},	
		{
			xtype:'label',
			text:'Confirmed extent:',
			x:05,
			y:180,
			
		},
		{
			xtype:'label',
			text:'tbc',
			x:250,
			y:180			
		},	
		{
			xtype:'label',
			text:'Client deadline:',
			x:05,
			y:200,
			
		},
		{
			xtype:'label',
			text:'00/01/00',
			x:250,
			y:200			
		},	
		{
			xtype:'label',
			text:'Agreed deadline:',
			x:05,
			y:220,
			
		},
		{
			xtype:'label',
			text:'tbc',
			x:250,
			y:220			
		},	
			{
			xtype:'label',
			text:'Word count:',
			x:05,
			y:240,
			
		},
		{
			xtype:'label',
			text:'0',
			x:250,
			y:240			
		},	
		{
			xtype:'label',
			text:'Schedule',
			x:05,
			y:280,
		style:	{
                    'font-weight':'bold',

                }
			
		},
		{
			xtype:'box',
			fieldLabel:'current text',
			text:'Current',
			id: 'myId7',
			html: '',
		//	 margin:'0 5 0 590',
			x:2,
			y:300,
			width:350,
			height:130,
			autoScroll:true,
			style: {
         border: "1px solid #000000",
  },
  },
		{
			xtype:'label',
			text:'Stage',
			x:05,
			y:300,
		style:	{
                    'font-weight':'bold',

                }
			
		},
		{
			xtype:'label',
			text:'Date',
			x:250,
			y:300,
			style:	{
                    'font-weight':'bold',

                }			
		},	
		{
			xtype:'label',
			text:'Received',
			x:05,
			y:320			
		},	
			{
			xtype:'label',
			text:'1/1/01',
			x:250,
			y:320,
			
		},
		{
			xtype:'label',
			text:'Report due',
			x:05,
			y:340			
		},	
			{
			xtype:'label',
			text:'15/01/01',
			x:250,
			y:340,
			
		},
		{
			xtype:'label',
			text:'First Proof received',
			x:05,
			y:360			
		},	
			{
			xtype:'label',
			text:'19/03/01',
			x:250,
			y:360,
			
		},
		{
			xtype:'label',
			text:'Revised Proof received',
			x:05,
			y:380			
		},	
			{
			xtype:'label',
			text:'09/05/01',
			x:250,
			y:380,
			
		},{
			xtype:'label',
			text:'Vocher deadline',
			x:05,
			y:400			
		},	
			{
			xtype:'label',
			text:'30/05/01',
			x:250,
			y:400,
			
		},
		{
			xtype:'box',
			fieldLabel:'current text',
			text:'Current',
			id: 'myId8',
			html: '',
		//	 margin:'0 5 0 590',
			x:2,
			y:460,
			width:450,
			height:100,
			autoScroll:true,
			style: {
         border: "1px solid #000000",
  },},
		{
			xtype:'label',
			text:'Team',
			x:05,
			y:440,
		style:	{
                    'font-weight':'bold',

                }
			
		},
		{
			xtype:'label',
			text:'Production editor',
			x:05,
			y:460			
		},	
			{
			xtype:'label',
			text:'tbc',
			x:250,
			y:460,
			
		},
		{
			xtype:'label',
			text:'0',
			x:380,
			y:460,
			
		},
		{
			xtype:'label',
			text:'Project manager',
			x:05,
			y:480			
		},	
			{
			xtype:'label',
			text:'tbc',
			x:250,
			y:480,
			
		},
		{
			xtype:'label',
			text:'0',
			x:380,
			y:480,
			
		},
		{
			xtype:'label',
			text:'Copy editor',
			x:05,
			y:500			
		},	
			{
			xtype:'label',
			text:'tbc',
			x:250,
			y:500,
			
		},
		{
			xtype:'label',
			text:'0',
			x:380,
			y:500,
			
		},
		{
			xtype:'label',
			text:'Proof reader',
			x:05,
			y:520			
		},	
			{
			xtype:'label',
			text:'tbc',
			x:250,
			y:520,
			
		},
		{
			xtype:'label',
			text:'0',
			x:380,
			y:520,
			
		},
		{
			xtype:'label',
			text:'Indexer',
			x:05,
			y:540			
		},	
			{
			xtype:'label',
			text:'tbc',
			x:250,
			y:540,
			
		},
		{
			xtype:'label',
			text:'0',
			x:380,
			y:540,
			
		},
		{
			xtype:'box',
			fieldLabel:'current text',
			text:'Current',
			id: 'myId9',
			html: '',
		//	 margin:'0 5 0 590',
			x:2,
			y:600,
			width:550,
			height:100,
			autoScroll:true,
			style: {
         border: "1px solid #000000",
  },},
		{
			xtype:'label',
			text: 'Budget: ',
			x:05,
			y:580	,	
			style:	{
                    'font-weight':'bold',

                }
				
		},	
			{
			xtype:'label',
			text:'Activity',
			x:05,
			y:600,
			style:	{
                    'font-weight':'bold',

                }
			
			
		},
		{
			xtype:'label',
			text:'Level',
			x:250,
			y:600,
			style:	{
                    'font-weight':'bold',

                }
			
			
		},
		{
			xtype:'label',
			text:'Page rate',
			x:380,
			y:600,
			style:	{
                    'font-weight':'bold',

                }
			
			
		},
		{
			xtype:'label',
			text:'Sub total',
			x:480,
			y:600,
			style:	{
                    'font-weight':'bold',

                }
			
			
		},
		{
			xtype:'label',
			text:'Copy editor',
			x:05,
			y:620,
			
		},
		{
			xtype:'label',
			text:'1',
			x:250,
			y:620,
		},
		{
			xtype:'label',
			text:'$1.00',
			x:380,
			y:620,
		},
		{
			xtype:'label',
			text:'$30',
			x:480,
			y:620,
		},
		{
			xtype:'label',
			text:'Proof reading ',
			x:05,
			y:640,
			
		},
		{
			xtype:'label',
			text:'1',
			x:250,
			y:640,
		},
			{
			xtype:'label',
			text:'$1.00',
			x:380,
			y:640,
		},
		{
			xtype:'label',
			text:'$30',
			x:480,
			y:640,
		},
		{
			xtype:'label',
			text:'[Other] ',
			x:05,
			y:660,
			
		},
		{
			xtype:'label',
			text:'1',
			x:250,
			y:660,
		},
			{
			xtype:'label',
			text:'$1.00',
			x:380,
			y:660,
		},
		{
			xtype:'label',
			text:'$30',
			x:480,
			y:660,
		},
		{
			xtype:'label',
			text:'Total',
			x:380,
			y:680,
		},
		{
			xtype:'label',
			text:'$90',
			x:480,
			y:680,
		},
		{
			xtype:'box',
			fieldLabel:'current text',
			text:'Current',
			id: 'myId10',
			html: '',
		//	 margin:'0 5 0 590',
			x:2,
			y:740,
			width:550,
			height:220,
			autoScroll:true,
			style: {
         border: "1px solid #000000",
  },},
		{
			xtype:'label',
			text:'Budget : $',
			x:05,
			y:720,
			style:	{
                    'font-weight':'bold',

                }
			
			
		},
		{
			xtype:'label',
			text:'project mangement',
			x:05,
			y:740,
		
			
			
		},
		{
			xtype:'label',
			text:'tbc',
			x:250,
			y:740,			
		},
		{
			xtype:'label',
			text:' Indexing',
			x:05,
			y:760,	
			
		},
		{
			xtype:'label',
			text:'n/a',
			x:250,
			y:760,			
			
		},
		{
			xtype:'label',
			text:'$0.00',
			x:380,
			y:760,
},
{
			xtype:'label',
			text:' Additional proof',
			x:05,
			y:780,	
			
		},
		{
			xtype:'label',
			text:'-',
			x:380,
			y:840,
},
		
		{
			xtype:'label',
			text:'$0.00',
			x:480,
			y:820,
			
},
{
			xtype:'label',
			text:' Artwork',
			x:05,
			y:800,	
			
		},
		
		{
			xtype:'label',
			text:'-',
			x:380,
			y:840,
},
		
		{
			xtype:'label',
			text:'$0.00',
			x:480,
			y:820,
			
},
{
			xtype:'label',
			text:' Courier charges ($)',
			x:05,
			y:820,	
			
		},
		{
			xtype:'label',
			text:'-',
			x:380,
			y:840,
},
		
		{
			xtype:'label',
			text:'$0.00',
			x:480,
			y:820,
			
},
{
			xtype:'label',
			text:' LoC application',
			x:05,
			y:840,	
			
		},
		{
			xtype:'label',
			text:'-',
			x:380,
			y:840,
},
		
		{
			xtype:'label',
			text:'$0.00',
			x:480,
			y:840,
},
{
			xtype:'label',
			text:'Adobe eBook  ',
			x:05,
			y:860,	
			
		},
		{
			xtype:'label',
			text:'-',
			x:380,
			y:860,
},
		
		{
			xtype:'label',
			text:'$0.00',
			x:480,
			y:860,
},
{
			xtype:'label',
			text:' Back-end conv. (LaTeX only) ',
			x:05,
			y:880,	
			
		},
		
		{
			xtype:'label',
			text:'$0.00',
			x:380,
			y:880,
},
{
			xtype:'label',
			text:'$0.00',
			x:480,
			y:880,
},
{
			xtype:'label',
			text:' [Other] ',
			x:05,
			y:900,	
			
		},
		
		{
			xtype:'label',
			text:'-',
			x:380,
			y:900,
},
{
			xtype:'label',
			text:'$0.00',
			x:480,
			y:900,
},
		
		
	/*	{
			xtype:'label',
			text:'Page rate',
			x:380,
			y:600,
			style:	{
                    'font-weight':'bold',

                }
			
			
		},
		{
			xtype:'label',
			text:'Sub total',
			x:480,
			y:600,
			style:	{
                    'font-weight':'bold',

                }
			
			
		},*/
	
			];
			
			
	/* bbar:
    [
        this.items = [
		
		 {
            xtype:'button',
            //formBind: true,
            fieldLabel:'submit',
         //   action:'submitAction',
            text:'Submit',
          //  defaultAlign:'t1-c'
            //flex:6,
        },
			
			
		
			]
    ]*/
	
		this.callParent();
	}
     
}); 


