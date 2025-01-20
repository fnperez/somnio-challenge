import type { IAPIError } from '../types/apis';

export class APIError extends Error {
	props: IAPIError;

	constructor( props: IAPIError ) {
		super( props.message );

		this.props = props;
	}
}
