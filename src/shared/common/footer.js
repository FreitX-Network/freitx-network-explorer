// @flow

import {styled} from 'styletron-inferno';
import {t} from '../../lib/iso-i18n';
import {fonts} from './styles/style-font';
import {colors} from './styles/style-color';
import {colorHover} from './color-hover';

export function Footer() {
  return (
    <FooterStyle className='footer'>
      <div className='container'>
        <div className='content has-text-centered'>
          <div className='columns'>
            <div className='column is-one-third'>
            </div>
            <div className='column is-one-third'><p>© 2018 FreitX Network</p></div>
            <div className='column is-one-third'>
            </div>
          </div>
        </div>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled('footer', props => ({
  ...fonts.body,
  backgroundColor: colors.nav03,
  color: colors.inverse01,
}));

const LinkStyle = styled('a', props => ({
  paddingLeft: '5px',
  paddingRight: '5px',
  cursor: 'pointer',
  ...colorHover(colors.inverse01, colors.brand02),
}));

const FooterIcon = styled('i', props => ({
  color: colors.iotex,
  fontSize: '2em',
  cursor: 'pointer',
  ...colorHover(colors.brand02, colors.brand02),
}));
