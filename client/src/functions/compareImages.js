function compareImages(formData) {
	console.log("formData: ", formData);
	return fetch("http://localhost:5001/compare", {
		method: "POST",
		body: formData
	})
		.then(response => response.json())
		.then(response => {
			let imgOneHeight = response.data.comparisonOne.height;
			let imgOneWidth = response.data.comparisonOne.width;
			let imgOneBuffer = response.data.comparisonOne.data.data;

			let imgTwoHeight = response.data.comparisonTwo.height;
			let imgTwoWidth = response.data.comparisonTwo.width;
			let imgTwoBuffer = response.data.comparisonTwo.data.data;

			return {
				imgOneHeight,
				imgOneWidth,
				imgOneBuffer,
				imgTwoHeight,
				imgTwoBuffer,
				imgTwoWidth
			};
		})
		.catch(error => console.log(error));
}

export default compareImages;
