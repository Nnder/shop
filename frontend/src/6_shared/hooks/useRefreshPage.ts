export function useRefreshPage(callback: ()=>void) {
    window.onbeforeunload = (event) => {
        const e = event || window.event;
        // Cancel the event
        e.preventDefault();
        if (e) {
          e.returnValue = ''; // Legacy method for cross browser support
        }
        callback()
        return ''; // Legacy method for cross browser support
      };  
}

