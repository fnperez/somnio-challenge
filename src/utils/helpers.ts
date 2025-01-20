export const cleanObject = <T extends object>( obj: T ): T =>
  //
  Object.keys( obj ).reduce( ( cleaned: object | undefined, key ) => {
  	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  	// @ts-ignore
  	if ( obj[ key ] !== undefined ) {
  		cleaned = cleaned === undefined
  			? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  		// @ts-ignore
  			{ [ key ]: obj[ key ] }
  			: // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  		// @ts-ignore
  			{ ...cleaned, [ key ]: obj[ key ] };
  	}

  	return cleaned;
  }, undefined ) as T;
