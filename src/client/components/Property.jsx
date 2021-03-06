import React, { createRef } from 'react';
import PropTypes from 'prop-types';

import expand from '../assets/expand.svg';
import styles from '../styles/Explorer.css';

export default class Property extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            expanded: false
        };
        this.textAreaRef = createRef();
    }

    changeEditing() {
        if (['object', 'undefined'].includes(typeof this.props.data)) return;
        this.setState({
            editing: !this.state.editing
        });
    }

    changeExpand() {
        this.setState({
            expanded: !this.state.expanded
        });
    }

    handleChange(e) {
        if (['object', 'undefined'].includes(typeof this.props.data)) return;
        if (typeof this.props.data === 'number' && !/(\d)/g.test(e.key))
            e.preventDefault();
    }

    renderChildren() {
        let data = String(this.props.data);
        const properties = Object.entries(this.props.data);
        if (typeof this.props.data === 'object') {
            data = '{';
            if (this.props.data instanceof Array)
                data = '[';

            if (this.state.expanded)
                data = <div className={styles.objectSpacing}>
                    {properties.map(([p, v], i, a) => <Property key={i} id={p} data={v} last={Boolean(i === (a.length - 1))} />)}
                </div>;
            else data += `${properties.length > 0 ? '...' : ''}${this.props.data instanceof Array ? ']' : '}'}`;
        }

        return data;
    }

    render() {
        return (<div className={`${styles.property} ${this.state.expanded ? styles.spaceObject : ''}`}>
            {typeof this.props.data === 'object' && Object.entries(this.props.data).length > 0
                ? <img
                    width='10'
                    height='10'
                    src={expand}
                    alt='Expand'
                    style={{ transform: this.state.expanded ? 'rotate(-90deg)' : 'none' }}
                    onClick={() => this.changeExpand()} />
                : null}
            {this.props.id}:
            <div className={`${styles.value} ${styles[typeof this.props.data]} ${this.state.expanded ? styles.objectInside : ''}`}>
                {typeof this.props.data === 'string' ? '"' : ''}
                {this.state.expanded
                    ? typeof this.props.data === 'object'
                        ? (this.props.data instanceof Array ? '[' : '{')
                        : ''
                    : null}
                {this.state.editing
                    ? <input
                        type='text'
                        onBlur={() => this.changeEditing()}
                        onKeyDown={(e) => this.handleChange(e)}
                        defaultValue={String(this.props.data)} />
                    : <div
                        onClick={() => this.changeEditing()}
                    >{this.renderChildren()}</div>}
                {this.state.expanded
                    ? typeof this.props.data === 'object'
                        ? (this.props.data instanceof Array ? ']' : '}')
                        : ''
                    : null}
                {typeof this.props.data === 'string' ? '"' : ''}
                {!this.props.last && typeof this.props.data === 'object' ? ',' : ''}
            </div>
            {!this.props.last && typeof this.props.data !== 'object' ? ',' : ''}
        </div >);
    }
}

Property.propTypes = {
    last: PropTypes.bool,
    id: PropTypes.string,
    data: PropTypes.any
};