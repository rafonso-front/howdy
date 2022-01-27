import * as React from 'react';
import { Shimmer, IShimmerStyleProps, IShimmerStyles,ShimmerElementType as ElemType } from 'office-ui-fabric-react/lib/Shimmer';

class shimmerCard extends React.Component <any, any> {
    constructor(props: {}) {
        super(props);
        this.state = {
        };
    }
    render(){
        return (
            <div>
                <Shimmer 
                    styles={this._getShimmerStyles}
                    shimmerElements={[
                        { type: ElemType.line, height: 77, width: '100%' },
                    ]}
                />
            </div>
        )
    }
    private _getShimmerStyles = (props: IShimmerStyleProps): IShimmerStyles => {
        return {
          shimmerWrapper: [
            {
                borderLeft:'4px solid #c03627',
                marginBottom:"13px",
                backgroundColor: '#f4f4f4',
                backgroundImage: 'linear-gradient(to right, rgba(244, 244, 244, 0) 0%, #d9d9d9 50%, rgba(255, 255, 255, 0) 100%)'
            }
          ]
        };
      };
      
}

export default shimmerCard;