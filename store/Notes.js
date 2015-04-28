 Ext.define('MyDesktop.store.Notes', {
        extend:'Ext.data.Store',
		pageSize: 50,
        model: 'MyDesktop.model.Notes',
        proxy: {
    		type:'ajax',
			url: 'service/notes.php',
			actionMethods: {
		     read: 'POST'
    		},
    			extraParams:{action:1},
    		reader: {
				type:'json',
	        	root: 'results',
    	    	totalProperty: 'total'
    		}
		},
    });
	
		
	
	