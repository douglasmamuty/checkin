import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render, within } from '@testing-library/react';

import theme from '../../../styles/theme';
import Container from '../Container';

describe('Container Component', () => {
  it('should be able to the render the Container component with children', () => {
    const content = 'Test';

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Container>{content}</Container>
      </ThemeProvider>,
    );

    const { getByText } = within(getByTestId('container-test'));

    expect(getByText(content)).toBeInTheDocument();
  });

  it('should be able to the render the Container component with custom padding', () => {
    const padding = '40px';

    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Container padding={padding}>Test</Container>
      </ThemeProvider>,
    );

    expect(getByTestId('container-test')).toHaveStyle(`padding: ${padding};`);
  });

  it('should be able to the render the Container component with transparent background', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Container transparent>Test</Container>
      </ThemeProvider>,
    );

    expect(getByTestId('container-test')).toHaveStyle(
      `background-color: transparent;`,
    );
  });
});
