import React, { FC } from 'react';
import classNames from 'classnames';
import { Container } from 'reactstrap';
import Background from 'components/common/Background';

interface ISectionProps {
  fluid: boolean;
  bg?: string;
  image?: string;
  overlay?: boolean | string;
  position?: string | { x: string; y: string };
  video?: [string];
  bgClassName?: string;
  className?: string;
  children?: any;
}

const Section: FC<ISectionProps> = ({
  fluid,
  bg,
  image,
  overlay,
  position,
  video,
  bgClassName,
  className,
  children,
  ...rest
}) => {
  const bgProps = { image, overlay, position, video, className: '' };
  bgClassName && (bgProps.className = bgClassName);

  return (
    <section className={classNames({ [`bg-${bg}`]: bg }, className)} {...rest}>
      {image && <Background {...bgProps} />}
      <Container fluid={fluid}>{children}</Container>
    </section>
  );
};

// Section.propTypes = {
//   fluid: PropTypes.bool,
//   bg: PropTypes.string,
//   image: PropTypes.string,
//   overlay: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
//   position: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.shape({
//       x: PropTypes.string,
//       y: PropTypes.string
//     })
//   ]),
//   video: PropTypes.array,
//   bgClassName: PropTypes.string,
//   className: PropTypes.string,
//   children: PropTypes.node
// };

Section.defaultProps = {
  fluid: false
};

export default Section;
