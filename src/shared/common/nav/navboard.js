// @flow

import Component from 'inferno-component';
import {t} from '../../../lib/iso-i18n';
import {ToolTip} from '../../common/tooltip';

export class Navboard extends Component {
  props: {
    epochs: number,
    blocks: number,
    executions: number,
    transfers: number,
    votes: number,
    faps: number,
    bbh: number,
  };

  render() {
    const stats = [
      [
        {
          title: t('dashboard.blocks'),
          subtitle: this.props.blocks,
        },
      ], [
        {
          title: t('dashboard.transfers'),
          subtitle: this.props.transfers,
        },
        {
          title: t('dashboard.epochs'),
          subtitle: this.props.epochs,
        },
      ], [
        {
          title: `${t('dashboard.executions')}`,
          subtitle: this.props.executions,
        },
        {
          title: t('dashboard.faps'),
          subtitle: this.props.faps,
        },
      ], [
        {
          title: t('dashboard.votes'),
          subtitle: this.props.votes,
        },
        {
          title: t('dashboard.bbh'),
          subtitle: this.props.bbh,
        },
      ],
    ];

    return (
      <div className='column dashboard-wrap'>
        {
          stats.map(row => {
            return (
              <div className='tile is-ancestor'>
                {row.map(s => (
                  <div className='tile is-parent'>
                    <article className='tile is-child'>
                      <div>
                        <p className='subtitle force-teal dashboard-title'>{s.title}</p>
                      </div>
                      <p className='title has-text-centered'>{s.subtitle}</p>
                    </article>
                  </div>
                ))}
              </div>
            );
          })
        }
      </div>
    );
  }
}
