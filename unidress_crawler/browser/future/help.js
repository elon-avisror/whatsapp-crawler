var HTMLpage = await page.evaluate('document.documentElement.innerHTML');
var $ = cheerio.load(HTMLpage);
var joinGroupButton = $(ids.joinGroupButton).html();
if (!(joinGroupButton)) {
    await page.click(ids.textArea);
    let time = setTimeout(async function () {
        await page.type(ids.postField, content, {
            delay: 100
        });
        await page.click(ids.sendButton);
        console.log('sent successfully.');

        let time = setTimeout(async function () {
            await resolve();
        }, (3 * 1000));
    }, (1 * 1000));
}
try {
    await page.goto(postLink, {
        waitUntil: 'load'
    });
    var redirectURL = await page.url();
    if (redirectURL == postLink || (redirectURL.includes(postLink) && !(redirectURL.includes('/about')))) {
        var HTMLpage = await page.evaluate('document.documentElement.innerHTML');
        var $ = cheerio.load(HTMLpage);
        var joinGroupButton = $(ids.joinGroupButton).html();
        if (!(joinGroupButton)) {
            await page.click(ids.textArea);
            let time = setTimeout(async function () {
                await page.type(ids.postField, content, {
                    delay: 100
                });
                await page.click(ids.sendButton);
                console.log('sent successfully.');

                let time = setTimeout(async function () {
                    await resolve();
                }, (3 * 1000));
            }, (1 * 1000));
        } else await reject('you are not a member in this group.');
    } else await reject('you are not a member in this group.');
} catch (err) {
    console.error('error catched in publishPost.');
    await reject(err);
};