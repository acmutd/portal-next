import React, { CSSProperties, useRef, useEffect } from "react";
import * as typeformEmbed from "@typeform/embed";
import { WidgetOptions } from "typeform__embed";

interface TypeformProps {
	/**
	 * Link to Typeform form.
	 * @example 'https://form.typeform.com/to/{id}'
	 */
	tfLink: string;
	/**
	 * Class names to assign to the generated <div>.
	 */
	className?: string;
	/**
	 * Custom styles to assign to the generated <div>.
	 */
	style?: CSSProperties;
	/**
	 * Typeform widget options, as defined by the Typeform library
	 * @see https://github.com/Typeform/embed#widget
	 */
	options?: WidgetOptions;
}

const Typeform = (props: TypeformProps): JSX.Element => {
	const typeformRef = useRef(new HTMLDivElement());
	useEffect(() => {
		typeformEmbed.makeWidget(typeformRef.current, props.tfLink, props.options);
	}, [props.tfLink, props.options, typeformRef]);
	return (
		<div ref={typeformRef} className={props.className} style={props.style} />
	);
};

export default Typeform;
