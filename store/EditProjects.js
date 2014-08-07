 Ext.define('MyDesktop.store.EditProjects', {
        extend:'Ext.data.Store',
		pageSize: 8,
        model: 'MyDesktop.model.EditProjects',
        proxy: {
    		type:'ajax',
			url: 'service/EditProjects.php',
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
	
	
	