# Natours Application

Build using modern tecknlogologies: Node.js, express, mongoDB and mongoose



```
natours
├─ .DS_Store
├─ backend
│  ├─ .eslintrc.json
│  ├─ .prettierrc
│  ├─ Routes
│  │  ├─ bookingRoutes.js
│  │  ├─ reviewRoutes.js
│  │  ├─ tourRoutes.js
│  │  ├─ userRoutes.js
│  │  └─ viewRoutes.js
│  ├─ app.js
│  ├─ controllers
│  │  ├─ authController.js
│  │  ├─ bookingController.js
│  │  ├─ errorController.js
│  │  ├─ handlerFactory.js
│  │  ├─ reviewController.js
│  │  ├─ tourController.js
│  │  ├─ userController.js
│  │  └─ viewsController.js
│  ├─ dev-data
│  │  ├─ .DS_Store
│  │  ├─ data
│  │  │  ├─ import-dev-data.js
│  │  │  ├─ reviews.json
│  │  │  ├─ tour5.js
│  │  │  ├─ tours-simple.json
│  │  │  ├─ tours.json
│  │  │  └─ users.json
│  │  ├─ img
│  │  │  ├─ aarav.jpg
│  │  │  ├─ leo.jpg
│  │  │  ├─ monica.jpg
│  │  │  ├─ new-tour-1.jpg
│  │  │  ├─ new-tour-2.jpg
│  │  │  ├─ new-tour-3.jpg
│  │  │  └─ new-tour-4.jpg
│  │  └─ templates
│  │     ├─ accountTemplate.pug
│  │     ├─ emailTemplate.pug
│  │     ├─ errorTemplate.pug
│  │     ├─ loginTemplate.pug
│  │     ├─ tourCardTemplate.pug
│  │     └─ tourTemplate.pug
│  ├─ models
│  │  ├─ bookingModel.js
│  │  ├─ reviewModel.js
│  │  ├─ tourModel.js
│  │  └─ userModel.js
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ server.js
│  └─ utils
│     ├─ apiFeatures.js
│     ├─ appError.js
│     ├─ catchAsync.js
│     └─ email.js
├─ frontend
│  ├─ .eslintrc.json
│  ├─ .next
│  │  ├─ app-build-manifest.json
│  │  ├─ build-manifest.json
│  │  ├─ cache
│  │  │  ├─ .rscinfo
│  │  │  ├─ images
│  │  │  │  ├─ P6OOSS8kDk6sYCe-rf7UkxLzDJHnn21dQPMUyK5tVHY
│  │  │  │  │  └─ 60.1730892658410.HjN2pFDnyXTPfDUlxbEIwNz7uQqyKB-zC3j07p8tz04.Vy8iMmJkMS0xNzU0MDE1MjUyOCI.webp
│  │  │  │  ├─ tABUuNMzJj5rfso0cTPrftFSKfc_xNEcL3nKpYfkZC0
│  │  │  │  │  └─ 60.1730893304088.k1HJZV7NOlvWBOcXwak7WU74xw9JL9NNFNc3luakdcM.Vy8iMmJkMS0xNzU0MDE1MjUyOCI.webp
│  │  │  │  └─ wlnVdkTsjQPqYHo_KRsJTYjPUFv-QHjYB5X0D4B7920
│  │  │  │     └─ 60.1730896388251.HjN2pFDnyXTPfDUlxbEIwNz7uQqyKB-zC3j07p8tz04.Vy8iMmJkMS0xNzU0MDE1MjUyOCI.webp
│  │  │  ├─ swc
│  │  │  │  └─ plugins
│  │  │  │     └─ v7_macos_x86_64_0.115.1
│  │  │  └─ webpack
│  │  │     ├─ client-development
│  │  │     │  ├─ 0.pack.gz
│  │  │     │  ├─ 1.pack.gz
│  │  │     │  ├─ 10.pack.gz
│  │  │     │  ├─ 11.pack.gz
│  │  │     │  ├─ 2.pack.gz
│  │  │     │  ├─ 3.pack.gz
│  │  │     │  ├─ 4.pack.gz
│  │  │     │  ├─ 5.pack.gz
│  │  │     │  ├─ 6.pack.gz
│  │  │     │  ├─ 7.pack.gz
│  │  │     │  ├─ 8.pack.gz
│  │  │     │  ├─ 9.pack.gz
│  │  │     │  ├─ index.pack.gz
│  │  │     │  └─ index.pack.gz.old
│  │  │     ├─ client-development-fallback
│  │  │     │  ├─ 0.pack.gz
│  │  │     │  └─ index.pack.gz
│  │  │     └─ server-development
│  │  │        ├─ 0.pack.gz
│  │  │        ├─ 1.pack.gz
│  │  │        ├─ 10.pack.gz
│  │  │        ├─ 11.pack.gz
│  │  │        ├─ 12.pack.gz
│  │  │        ├─ 13.pack.gz
│  │  │        ├─ 14.pack.gz
│  │  │        ├─ 15.pack.gz
│  │  │        ├─ 16.pack.gz
│  │  │        ├─ 17.pack.gz
│  │  │        ├─ 2.pack.gz
│  │  │        ├─ 3.pack.gz
│  │  │        ├─ 4.pack.gz
│  │  │        ├─ 5.pack.gz
│  │  │        ├─ 6.pack.gz
│  │  │        ├─ 7.pack.gz
│  │  │        ├─ 8.pack.gz
│  │  │        ├─ 9.pack.gz
│  │  │        ├─ index.pack.gz
│  │  │        └─ index.pack.gz.old
│  │  ├─ fallback-build-manifest.json
│  │  ├─ package.json
│  │  ├─ react-loadable-manifest.json
│  │  ├─ server
│  │  │  ├─ _error.js
│  │  │  ├─ app
│  │  │  │  ├─ _not-found
│  │  │  │  │  ├─ page.js
│  │  │  │  │  └─ page_client-reference-manifest.js
│  │  │  │  ├─ page.js
│  │  │  │  └─ page_client-reference-manifest.js
│  │  │  ├─ app-paths-manifest.json
│  │  │  ├─ interception-route-rewrite-manifest.js
│  │  │  ├─ middleware-build-manifest.js
│  │  │  ├─ middleware-manifest.json
│  │  │  ├─ middleware-react-loadable-manifest.js
│  │  │  ├─ next-font-manifest.js
│  │  │  ├─ next-font-manifest.json
│  │  │  ├─ pages
│  │  │  │  ├─ _app.js
│  │  │  │  ├─ _document.js
│  │  │  │  └─ _error.js
│  │  │  ├─ pages-manifest.json
│  │  │  ├─ server-reference-manifest.js
│  │  │  ├─ server-reference-manifest.json
│  │  │  ├─ vendor-chunks
│  │  │  │  ├─ @swc.js
│  │  │  │  └─ next.js
│  │  │  └─ webpack-runtime.js
│  │  ├─ static
│  │  │  ├─ chunks
│  │  │  │  ├─ _error.js
│  │  │  │  ├─ app
│  │  │  │  │  ├─ _not-found
│  │  │  │  │  │  └─ page.js
│  │  │  │  │  ├─ layout.js
│  │  │  │  │  └─ page.js
│  │  │  │  ├─ app-pages-internals.js
│  │  │  │  ├─ fallback
│  │  │  │  │  ├─ amp.js
│  │  │  │  │  ├─ main.js
│  │  │  │  │  ├─ pages
│  │  │  │  │  │  ├─ _app.js
│  │  │  │  │  │  └─ _error.js
│  │  │  │  │  ├─ react-refresh.js
│  │  │  │  │  └─ webpack.js
│  │  │  │  ├─ main-app.js
│  │  │  │  ├─ main.js
│  │  │  │  ├─ pages
│  │  │  │  │  ├─ _app.js
│  │  │  │  │  └─ _error.js
│  │  │  │  ├─ polyfills.js
│  │  │  │  ├─ react-refresh.js
│  │  │  │  └─ webpack.js
│  │  │  ├─ css
│  │  │  │  └─ app
│  │  │  │     └─ layout.css
│  │  │  ├─ development
│  │  │  │  ├─ _buildManifest.js
│  │  │  │  └─ _ssgManifest.js
│  │  │  ├─ media
│  │  │  │  └─ pin.796219e2.png
│  │  │  └─ webpack
│  │  │     ├─ 0214a97a2f5227d0.webpack.hot-update.json
│  │  │     ├─ 09079ab0dc5bfb07.webpack.hot-update.json
│  │  │     ├─ 25b35cd6405ca416.webpack.hot-update.json
│  │  │     ├─ 2f81ec387dfc1bca.webpack.hot-update.json
│  │  │     ├─ 32f61c8d8096f32e.webpack.hot-update.json
│  │  │     ├─ 3a15f3c1b254f862.webpack.hot-update.json
│  │  │     ├─ 3bdee6c22f6f5b95.webpack.hot-update.json
│  │  │     ├─ 4061b6a63266251c.webpack.hot-update.json
│  │  │     ├─ 43fcbcb44bb87b5f.webpack.hot-update.json
│  │  │     ├─ 446fc9058e596297.webpack.hot-update.json
│  │  │     ├─ 4edd2dc1ea59b83d.webpack.hot-update.json
│  │  │     ├─ 5e28f4ceb8d0aecf.webpack.hot-update.json
│  │  │     ├─ 633457081244afec._.hot-update.json
│  │  │     ├─ 63f54b217403d278.webpack.hot-update.json
│  │  │     ├─ 664902e8d1241f80.webpack.hot-update.json
│  │  │     ├─ 67d804c4c44b97e1.webpack.hot-update.json
│  │  │     ├─ 6b529ce36d0067bc.webpack.hot-update.json
│  │  │     ├─ 75b35f2844dc467b.webpack.hot-update.json
│  │  │     ├─ 760bed63aa9ba1ea.webpack.hot-update.json
│  │  │     ├─ 79dcb08b08e13250.webpack.hot-update.json
│  │  │     ├─ 80f422aea7f08add.webpack.hot-update.json
│  │  │     ├─ 8274d60615ff4494.webpack.hot-update.json
│  │  │     ├─ 841efce6da4742f8.webpack.hot-update.json
│  │  │     ├─ 84a7f207b44d1bb0.webpack.hot-update.json
│  │  │     ├─ 89b5eee3a94f3414.webpack.hot-update.json
│  │  │     ├─ abc9a44c4bad1a6c.webpack.hot-update.json
│  │  │     ├─ app
│  │  │     │  ├─ layout.09079ab0dc5bfb07.hot-update.js
│  │  │     │  ├─ layout.32f61c8d8096f32e.hot-update.js
│  │  │     │  ├─ layout.3a15f3c1b254f862.hot-update.js
│  │  │     │  ├─ layout.4061b6a63266251c.hot-update.js
│  │  │     │  ├─ layout.446fc9058e596297.hot-update.js
│  │  │     │  ├─ layout.4edd2dc1ea59b83d.hot-update.js
│  │  │     │  ├─ layout.5e28f4ceb8d0aecf.hot-update.js
│  │  │     │  ├─ layout.63f54b217403d278.hot-update.js
│  │  │     │  ├─ layout.67d804c4c44b97e1.hot-update.js
│  │  │     │  ├─ layout.6b529ce36d0067bc.hot-update.js
│  │  │     │  ├─ layout.760bed63aa9ba1ea.hot-update.js
│  │  │     │  ├─ layout.80f422aea7f08add.hot-update.js
│  │  │     │  ├─ layout.8274d60615ff4494.hot-update.js
│  │  │     │  ├─ layout.84a7f207b44d1bb0.hot-update.js
│  │  │     │  ├─ layout.abc9a44c4bad1a6c.hot-update.js
│  │  │     │  ├─ layout.b3ed200102946e13.hot-update.js
│  │  │     │  ├─ layout.bc840f45564d6dd0.hot-update.js
│  │  │     │  ├─ layout.be282b8733b38f4d.hot-update.js
│  │  │     │  ├─ layout.c70cf55d3837e3c1.hot-update.js
│  │  │     │  ├─ layout.c9aa1410bc79e45e.hot-update.js
│  │  │     │  ├─ layout.ce19bf6bde904835.hot-update.js
│  │  │     │  ├─ layout.d69d5266c494b00a.hot-update.js
│  │  │     │  ├─ layout.d90b92189e7b2bb4.hot-update.js
│  │  │     │  ├─ layout.d929fef4ce58c9ee.hot-update.js
│  │  │     │  ├─ layout.f71b273dbd3b9a43.hot-update.js
│  │  │     │  ├─ page.3a15f3c1b254f862.hot-update.js
│  │  │     │  ├─ page.63f54b217403d278.hot-update.js
│  │  │     │  ├─ page.841efce6da4742f8.hot-update.js
│  │  │     │  ├─ page.89b5eee3a94f3414.hot-update.js
│  │  │     │  └─ page.d650845847329ea0.hot-update.js
│  │  │     ├─ b3ed200102946e13.webpack.hot-update.json
│  │  │     ├─ bac2a120602701fa.webpack.hot-update.json
│  │  │     ├─ bc840f45564d6dd0.webpack.hot-update.json
│  │  │     ├─ be282b8733b38f4d.webpack.hot-update.json
│  │  │     ├─ c70cf55d3837e3c1.webpack.hot-update.json
│  │  │     ├─ c9aa1410bc79e45e.webpack.hot-update.json
│  │  │     ├─ ce19bf6bde904835.webpack.hot-update.json
│  │  │     ├─ d26997ca7703f3d8.webpack.hot-update.json
│  │  │     ├─ d377a0df979efd5b.webpack.hot-update.json
│  │  │     ├─ d650845847329ea0.webpack.hot-update.json
│  │  │     ├─ d69d5266c494b00a.webpack.hot-update.json
│  │  │     ├─ d90b92189e7b2bb4.webpack.hot-update.json
│  │  │     ├─ d929fef4ce58c9ee.webpack.hot-update.json
│  │  │     ├─ f71b273dbd3b9a43.webpack.hot-update.json
│  │  │     ├─ main.2f81ec387dfc1bca.hot-update.js
│  │  │     ├─ main.d377a0df979efd5b.hot-update.js
│  │  │     ├─ webpack.0214a97a2f5227d0.hot-update.js
│  │  │     ├─ webpack.09079ab0dc5bfb07.hot-update.js
│  │  │     ├─ webpack.25b35cd6405ca416.hot-update.js
│  │  │     ├─ webpack.2f81ec387dfc1bca.hot-update.js
│  │  │     ├─ webpack.32f61c8d8096f32e.hot-update.js
│  │  │     ├─ webpack.3a15f3c1b254f862.hot-update.js
│  │  │     ├─ webpack.3bdee6c22f6f5b95.hot-update.js
│  │  │     ├─ webpack.4061b6a63266251c.hot-update.js
│  │  │     ├─ webpack.43fcbcb44bb87b5f.hot-update.js
│  │  │     ├─ webpack.446fc9058e596297.hot-update.js
│  │  │     ├─ webpack.4edd2dc1ea59b83d.hot-update.js
│  │  │     ├─ webpack.5e28f4ceb8d0aecf.hot-update.js
│  │  │     ├─ webpack.63f54b217403d278.hot-update.js
│  │  │     ├─ webpack.664902e8d1241f80.hot-update.js
│  │  │     ├─ webpack.67d804c4c44b97e1.hot-update.js
│  │  │     ├─ webpack.6b529ce36d0067bc.hot-update.js
│  │  │     ├─ webpack.75b35f2844dc467b.hot-update.js
│  │  │     ├─ webpack.760bed63aa9ba1ea.hot-update.js
│  │  │     ├─ webpack.79dcb08b08e13250.hot-update.js
│  │  │     ├─ webpack.80f422aea7f08add.hot-update.js
│  │  │     ├─ webpack.8274d60615ff4494.hot-update.js
│  │  │     ├─ webpack.841efce6da4742f8.hot-update.js
│  │  │     ├─ webpack.84a7f207b44d1bb0.hot-update.js
│  │  │     ├─ webpack.89b5eee3a94f3414.hot-update.js
│  │  │     ├─ webpack.abc9a44c4bad1a6c.hot-update.js
│  │  │     ├─ webpack.b3ed200102946e13.hot-update.js
│  │  │     ├─ webpack.bac2a120602701fa.hot-update.js
│  │  │     ├─ webpack.bc840f45564d6dd0.hot-update.js
│  │  │     ├─ webpack.be282b8733b38f4d.hot-update.js
│  │  │     ├─ webpack.c70cf55d3837e3c1.hot-update.js
│  │  │     ├─ webpack.c9aa1410bc79e45e.hot-update.js
│  │  │     ├─ webpack.ce19bf6bde904835.hot-update.js
│  │  │     ├─ webpack.d26997ca7703f3d8.hot-update.js
│  │  │     ├─ webpack.d377a0df979efd5b.hot-update.js
│  │  │     ├─ webpack.d650845847329ea0.hot-update.js
│  │  │     ├─ webpack.d69d5266c494b00a.hot-update.js
│  │  │     ├─ webpack.d90b92189e7b2bb4.hot-update.js
│  │  │     ├─ webpack.d929fef4ce58c9ee.hot-update.js
│  │  │     └─ webpack.f71b273dbd3b9a43.hot-update.js
│  │  ├─ trace
│  │  └─ types
│  │     ├─ app
│  │     │  ├─ layout.ts
│  │     │  └─ page.ts
│  │     ├─ cache-life.d.ts
│  │     └─ package.json
│  ├─ .prettierrc
│  ├─ OLD views
│  │  ├─ _footer.pug
│  │  ├─ _header.pug
│  │  ├─ _reviewCard.pug
│  │  ├─ account.pug
│  │  ├─ base.pug
│  │  ├─ email
│  │  │  ├─ _style.pug
│  │  │  ├─ baseEmail.pug
│  │  │  ├─ passwordReset.pug
│  │  │  └─ welcome.pug
│  │  ├─ error.pug
│  │  ├─ login.pug
│  │  ├─ overview.pug
│  │  ├─ signup.pug
│  │  └─ tour.pug
│  ├─ README.md
│  ├─ app
│  │  ├─ components
│  │  │  └─ Header.tsx
│  │  ├─ fonts
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ pages
│  │     └─ overview
│  │        └─ OverviewPage.tsx
│  ├─ next-env.d.ts
│  ├─ next.config.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ postcss.config.mjs
│  ├─ public
│  │  ├─ .DS_Store
│  │  ├─ css
│  │  │  └─ style.css
│  │  ├─ img
│  │  │  ├─ .DS_Store
│  │  │  ├─ favicon.png
│  │  │  ├─ icons.svg
│  │  │  ├─ logo-green-round.png
│  │  │  ├─ logo-green-small.png
│  │  │  ├─ logo-green.png
│  │  │  ├─ logo-white.png
│  │  │  ├─ pin.png
│  │  │  ├─ tours
│  │  │  │  ├─ tour-1-1.jpg
│  │  │  │  ├─ tour-1-2.jpg
│  │  │  │  ├─ tour-1-3.jpg
│  │  │  │  ├─ tour-1-cover.jpg
│  │  │  │  ├─ tour-2-1.jpg
│  │  │  │  ├─ tour-2-2.jpg
│  │  │  │  ├─ tour-2-3.jpg
│  │  │  │  ├─ tour-2-cover.jpg
│  │  │  │  ├─ tour-3-1.jpg
│  │  │  │  ├─ tour-3-2.jpg
│  │  │  │  ├─ tour-3-3.jpg
│  │  │  │  ├─ tour-3-cover.jpg
│  │  │  │  ├─ tour-4-1.jpg
│  │  │  │  ├─ tour-4-2.jpg
│  │  │  │  ├─ tour-4-3.jpg
│  │  │  │  ├─ tour-4-cover.jpg
│  │  │  │  ├─ tour-5-1.jpg
│  │  │  │  ├─ tour-5-2.jpg
│  │  │  │  ├─ tour-5-3.jpg
│  │  │  │  ├─ tour-5-cover.jpg
│  │  │  │  ├─ tour-6-1.jpg
│  │  │  │  ├─ tour-6-2.jpg
│  │  │  │  ├─ tour-6-3.jpg
│  │  │  │  ├─ tour-6-cover.jpg
│  │  │  │  ├─ tour-67224fa17088750400ec7c54-1730304083146-cover.jpeg
│  │  │  │  ├─ tour-67224fa17088750400ec7c54-1730306085078-cover.jpeg
│  │  │  │  ├─ tour-67224fa17088750400ec7c54-1730306224401-cover.jpeg
│  │  │  │  ├─ tour-67224fa17088750400ec7c54-1730306224490-1.jpeg
│  │  │  │  ├─ tour-67224fa17088750400ec7c54-1730306224491-2.jpeg
│  │  │  │  ├─ tour-67224fa17088750400ec7c54-1730306224491-3.jpeg
│  │  │  │  ├─ tour-7-1.jpg
│  │  │  │  ├─ tour-7-2.jpg
│  │  │  │  ├─ tour-7-3.jpg
│  │  │  │  ├─ tour-7-cover.jpg
│  │  │  │  ├─ tour-8-1.jpg
│  │  │  │  ├─ tour-8-2.jpg
│  │  │  │  ├─ tour-8-3.jpg
│  │  │  │  ├─ tour-8-cover.jpg
│  │  │  │  ├─ tour-9-1.jpg
│  │  │  │  ├─ tour-9-2.jpg
│  │  │  │  ├─ tour-9-3.jpg
│  │  │  │  └─ tour-9-cover.jpg
│  │  │  └─ users
│  │  │     ├─ 7218ea95df8fcbb28f3b1a2942ef5ac1
│  │  │     ├─ 7b39742158ad99b9f5a44893ddf9a860
│  │  │     ├─ default.jpg
│  │  │     ├─ df5aaaced3bc83f61446d1ca9bdcaabd
│  │  │     ├─ user-1.jpg
│  │  │     ├─ user-10.jpg
│  │  │     ├─ user-11.jpg
│  │  │     ├─ user-12.jpg
│  │  │     ├─ user-13.jpg
│  │  │     ├─ user-14.jpg
│  │  │     ├─ user-15.jpg
│  │  │     ├─ user-16.jpg
│  │  │     ├─ user-17.jpg
│  │  │     ├─ user-18.jpg
│  │  │     ├─ user-19.jpg
│  │  │     ├─ user-2.jpg
│  │  │     ├─ user-20.jpg
│  │  │     ├─ user-3.jpg
│  │  │     ├─ user-4.jpg
│  │  │     ├─ user-5.jpg
│  │  │     ├─ user-5c8a1e1a2f8fb814b56fa182-1730284972624.jpeg
│  │  │     ├─ user-5c8a1e1a2f8fb814b56fa182-1730285225971.jpeg
│  │  │     ├─ user-5c8a1e1a2f8fb814b56fa182-1730285274432.jpeg
│  │  │     ├─ user-5c8a1e1a2f8fb814b56fa182-1730285333450.jpeg
│  │  │     ├─ user-5c8a1e1a2f8fb814b56fa182-1730285340967.jpeg
│  │  │     ├─ user-5c8a21f22f8fb814b56fa18a-1730287887145.jpeg
│  │  │     ├─ user-5c8a21f22f8fb814b56fa18a-1730295176575.jpeg
│  │  │     ├─ user-6.jpg
│  │  │     ├─ user-6722101e08507327fae28284-1730285749676.jpeg
│  │  │     ├─ user-6722101e08507327fae28284-1730286154909.jpeg
│  │  │     ├─ user-6722101e08507327fae28284-1730286178424.jpeg
│  │  │     ├─ user-7.jpg
│  │  │     ├─ user-8.jpg
│  │  │     └─ user-9.jpg
│  │  ├─ js
│  │  │  ├─ alerts.js
│  │  │  ├─ bundle.js
│  │  │  ├─ bundle.js.map
│  │  │  ├─ index.js
│  │  │  ├─ login.js
│  │  │  ├─ mapbox.js
│  │  │  ├─ signup.js
│  │  │  ├─ stripe.js
│  │  │  └─ updateSettings.js
│  │  ├─ overview.html
│  │  └─ tour.html
│  ├─ tailwind.config.ts
│  └─ tsconfig.json
└─ readme.md

```