/** @jsx jsx */
// eslint-disable-next-line
import { jsx } from '@emotion/core'
import { render } from 'react-dom'

function App() {
  return (
    <div
      className={`absolute flex overflow-hidden`}
      css={{
        width: 1200,
        height: 630,
        background: window.background ? `#${window.background}` : '#fff',
      }}
    >
      <div
        className="flex flex-col justify-between flex-1 p-32 m-10 shadow-2xl rounded-2xl"
        css={{
          background: window.boxBackground
            ? `#${window.boxBackground}`
            : '#1a202c',
        }}
      >
        <h1
          className={`h-full ${window.titleAlign} ${window.titleSize} ${window.titleMargin}`}
          css={{
            color: window.titleColor ? `#${window.titleColor}` : '#fff',
          }}
          dangerouslySetInnerHTML={{
            __html: decodeURIComponent(decodeURIComponent(window.title)),
          }}
        ></h1>

        <div className={`flex justify-between ${window.detailsMargin}`}>
          <ul
            className={`${window.tagsSize} flex`}
            css={{
              color: window.tagsColor ? `#${window.tagsColor}` : '#fff',
              '& li': {
                marginRight: '.5rem',
                '&:not(:last-child):after': {
                  content: "'•'",
                  marginLeft: '.5rem',
                },
              },
            }}
          >
            {window.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <span
            className={`${window.authorSize}`}
            css={{
              color: window.authorColor ? `#${window.authorColor}` : '#fff',
            }}
          >
            {window.logoUrl && (
              <img
                src={window.logoUrl}
                alt={window.title}
                className={`${window.logoSize} inline-block ${window.logoMargin}`}
              />
            )}
            {window.atSymbol && '@'}
            {window.author}
          </span>
        </div>
      </div>
    </div>
  )
}

render(<App />, document.getElementById('app'))
