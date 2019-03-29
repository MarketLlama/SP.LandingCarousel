import * as React from 'react';
import {ISlideProps} from '.';

export class Slide extends React.Component<ISlideProps, {}> {
  constructor(props: ISlideProps) {
    super(props);
  }
  public render() {
    return ( <div>Hello World</div> );
  }
}

