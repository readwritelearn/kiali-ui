import * as React from 'react';
import Draggable from 'react-draggable';
import { Card } from 'patternfly-react';
import { PfColors } from '../../components/Pf/PfColors';
import { style } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';

export interface GraphLegendProps {
  closeLegend: () => void;
}

export interface GraphLegendState {}

export interface ArrowProps {
  color: string;
  label: string;
  dashed: boolean;
}
const dashedTemplate = (color: string) => {
  return `repeating-linear-gradient(90deg, ${color},  ${color} 10px, white 10px, white 20px)`;
};

const Arrow = (props: ArrowProps) => {
  const line: NestedCSSProperties = { marginTop: '5px', width: '90px', height: '5px', float: 'left' };
  if (props.dashed) {
    line['backgroundImage'] = dashedTemplate(props.color);
  } else {
    line['backgroundColor'] = props.color;
  }
  const lineBase = style(line);
  const arrowStyle = style({ marginTop: 20, clear: 'both' });
  const arrowDiv = style({ width: '175px', float: 'left' });
  const labelStyle = style({ float: 'left', verticalAlign: 'middle', height: '20px' });
  return (
    <div className={arrowStyle}>
      <div className={arrowDiv}>
        <div className={lineBase} />
        <div className={labelStyle}>{props.label}</div>
      </div>
    </div>
  );
};

export default class GraphLegend extends React.Component<GraphLegendProps, GraphLegendState> {
  constructor(props: GraphLegendProps) {
    super(props);
  }

  render() {
    const dragHandlers = {};
    const cardStyle = style({ zIndex: 10, width: '20em', position: 'absolute' });
    return (
      <Draggable defaultPosition={{ x: 20, y: 500 }} {...dragHandlers}>
        <Card accented={false} className={cardStyle}>
          <Card.Body>
            <Arrow color={PfColors.Red100} label={'Over 10% Error'} dashed={false} />
            <Arrow color={PfColors.Orange400} label={'5 - 10% Error'} dashed={false} />
            <Arrow color={PfColors.Green400} label={'< 5% Error'} dashed={false} />
            <Arrow color={PfColors.Black} label={'Idle'} dashed={false} />
            <Arrow color={PfColors.Black} label={'No Traffic yet'} dashed={true} />
          </Card.Body>
        </Card>
      </Draggable>
    );
  }
}
